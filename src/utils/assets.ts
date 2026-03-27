export const imagesToLoad: { [key: string]: string } = {
    plane: "/assets/img/plane.png",
    tank: "/assets/img/tank_70_34.png",
    enemy_plane: "/assets/img/enemy_plane.png",
    tree_0: "/assets/img/tree_0.png",
    tree_1: "/assets/img/tree_1.png",
};

export class AssetManager {
    static images: { [key: string]: HTMLImageElement } = {};

    static async loadAll(): Promise<void> {
        const promises = Object.entries(imagesToLoad).map(([key, src]: [string, string]) => {
            return new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    this.images[key] = img;
                    resolve();
                };
                img.onerror = () => {
                    console.error(`Failed to load image: ${src}`);
                    resolve();
                };
                img.src = src;
            });
        });
        await Promise.all(promises);
    }

    static getImage(key: string): HTMLImageElement {
        return this.images[key];
    }
}
