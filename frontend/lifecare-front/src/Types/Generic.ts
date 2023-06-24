export type DynamicObject = {
    [key: string]: any,
}

export interface ServerResponse {
    data: string;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: Record<string, any>;
    request: XMLHttpRequest;
  }