import { API } from '@/domain/apis/api';

interface Provider {
  request: <T>(
    path: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    body?: Record<string, unknown>,
    params?: Record<string, unknown>
  ) => Promise<T>;
}

export class HTTPService {
  constructor(
    private readonly provider: Provider,
    private readonly baseUrl: string
  ) { }

  createRequest<
    ResponseDTO,
    RequestDTO extends Record<string, unknown>,
    QueryParamsDTO extends Record<string, string | number>,
  >(api: API) {
    interface Input {
      body?: RequestDTO;
      queryParams?: QueryParamsDTO;
      pathParams?: Record<string, string>;
    }

    return async ({ body, queryParams, pathParams }: Input): Promise<ResponseDTO> => {
      try {
        const response = await this.provider.request<ResponseDTO>(
          `${this.baseUrl}${this.interpolatePath(api.path, pathParams)}`,
          api.method,
          body,
          queryParams
        );

        return response;
      } catch (error) {
        // TelemetryService.emit('app:error', {
        //   originalError: error,
        //   context: 'HTTPService'
        // });

        throw error;
      }
    };
  }

  private interpolatePath(path: string, pathParams?: Record<string, string>) {
    if (!path.includes(':')) {
      return path;
    }

    if (path.includes(':') && !pathParams) {
      throw new Error('Missing path params object');
    }

    if (!pathParams) {
      return path;
    }

    return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
      const value = pathParams[key];

      if (!value) {
        throw new Error(`Missing path param: ${key}`);
      }

      return encodeURIComponent(value);
    });
  }
}
