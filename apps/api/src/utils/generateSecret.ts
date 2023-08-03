export const generateAppSecret = () => {
    const length = 32;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let secret = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        secret += charset.charAt(Math.floor(Math.random() * n));
    }

    return `cari_surau_${secret}`;
}