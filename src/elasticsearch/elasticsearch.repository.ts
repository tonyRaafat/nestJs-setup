/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  QueryDslQueryContainer,
  SearchHit,
} from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export abstract class ElasticsearchRepository<T> {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createIndex(index: string) {
    return this.elasticsearchService.indices.create({ index });
  }

  async addDocument(index: string, document: unknown, id?: string) {
    if (Array.isArray(document)) {
      return document.map(async (el) => {
        return await this.elasticsearchService.index({
          index,
          id: el._id,
          body: el,
        });
      });
    }
    return this.elasticsearchService.index({
      index,
      id,
      body: document,
    });
  }

  async getAllDocuments(
    index: string,
  ): Promise<{ id: string | undefined; document: T }[]> {
    try {
      const body = await this.elasticsearchService.search({
        index,
        body: {
          query: {
            match_all: {},
          },
        },
        size: 1000,
      });

      return body.hits.hits.map((hit: SearchHit) => ({
        id: hit._id,
        document: hit._source as T,
      }));
    } catch (error) {
      console.error('Error fetching all documents:', error);
      return [];
    }
  }

  async getDocumentById(index: string, id: string): Promise<T | null> {
    try {
      const body = await this.elasticsearchService.get({
        index,
        id,
      });

      if (body && body.found && body._source) {
        return body._source as T;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching document by ID:', error);
      return null;
    }
  }

  async search(index: string, query: QueryDslQueryContainer): Promise<T[]> {
    const body = await this.elasticsearchService.search({
      index,
      body: {
        query,
      },
    });
    return body.hits.hits.map((hit) => hit._source as T);
  }

  async searchByMust(index: string, mustQueries: any[]): Promise<T[]> {
    return this.performSearch(index, {
      bool: {
        must: mustQueries,
      },
    });
  }

  async searchByShould(index: string, shouldQueries: any[]): Promise<T[]> {
    return this.performSearch(index, {
      bool: {
        should: shouldQueries,
      },
    });
  }

  async searchByMustNot(index: string, mustNotQueries: any[]): Promise<T[]> {
    return this.performSearch(index, {
      bool: {
        must_not: mustNotQueries,
      },
    });
  }

  async searchByFilter(index: string, filterQueries: any[]): Promise<T[]> {
    return this.performSearch(index, {
      bool: {
        filter: filterQueries,
      },
    });
  }

  private async performSearch(index: string, query: any): Promise<T[]> {
    try {
      const body = await this.elasticsearchService.search({
        index,
        body: {
          query,
        },
        size: 1000,
      });

      return body.hits.hits.map((hit: any) => hit._source as T);
    } catch (error) {
      console.error('Error performing search:', error);
      return [];
    }
  }

  async updateDocument(index: string, id: string, document: Partial<T>) {
    return this.elasticsearchService.update({
      index,
      id,
      body: {
        doc: document,
      },
    });
  }

  async deleteDocument(index: string, id: string) {
    return this.elasticsearchService.delete({
      index,
      id,
    });
  }

  async clearIndex(index: string) {
    try {
      return await this.elasticsearchService.deleteByQuery({
        index,
        body: {
          query: {
            match_all: {},
          },
        },
      });
    } catch (error) {
      throw new Error(`Error deleting documents from index ${index}: ${error}`);
    }
  }
}
