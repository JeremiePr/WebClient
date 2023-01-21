import * as request from 'request-promise';

export class WebClient
{
    public static async get<T>(url: string, params: { [key: string]: string } = {}): Promise<T>
    {
        return await this.send('GET', url, null, params);
    }

    public static async post<T>(url: string, body: any, params: { [key: string]: string } = {}): Promise<T>
    {
        return await this.send('POST', url, body, params);
    }

    public static async put<T>(url: string, body: any, params: { [key: string]: string } = {}): Promise<T>
    {
        return await this.send('PUT', url, body, params);
    }

    public static async patch<T>(url: string, body: any, params: { [key: string]: string } = {}): Promise<T>
    {
        return await this.send('PATCH', url, body, params);
    }

    public static async delete<T>(url: string, params: { [key: string]: string } = {}): Promise<T>
    {
        return await this.send('DELETE', url, null, params);
    }

    private static async send<T>(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', url: string, body: any, params: { [key: string]: string } = {}): Promise<T>
    {
        const options: any = {
            method,
            uri: this.getUri(url, params),
            json: true,
        };
        if (body)
        {
            options.body = body;
        }
        switch (method)
        {
            case 'GET':
                return await request.get(options) as T;
            case 'POST':
                return await request.post(options) as T;
            case 'PUT':
                return await request.put(options) as T;
            case 'PATCH':
                return await request.patch(options) as T;
            case 'DELETE':
                return await request.delete(options) as T;
            default:
                throw new Error(`Method '${method}' is not allowed`);
        }
    }

    private static getUri(url: string, params: { [key: string]: string } = {}): string
    {
        const keys = Object.keys(params);
        if (keys.length > 0)
        {
            const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
            return url + '?' + queryString;
        }
        else
        {
            return url;
        }
    }
}