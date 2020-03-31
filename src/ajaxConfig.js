const IS_PRODUCTION = process.env.NODE_ENV === 'production';

let baseUrl = '';
if (!IS_PRODUCTION) {
    baseUrl = 'https://references.visavix.com';
}

export default baseUrl;