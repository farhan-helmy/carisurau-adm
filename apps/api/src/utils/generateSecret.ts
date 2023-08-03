const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export enum SecretType {
    KEY,
    SECRET
}

export const generateAppSecret = (type: SecretType, length: number) => {
    let secret = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        secret += charset.charAt(Math.floor(Math.random() * n));
    }

    if (type === SecretType.KEY) return `${secret}`;

    return `cari_surau_${secret}`;
}