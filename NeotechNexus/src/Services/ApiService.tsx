import { Tag } from "../Types/Tag";

export const getTagsAsync = async (localisation: string): Promise<Tag[]> => {

    let url = `http://localhost:5068/api/tags?localisation=${localisation}`;

    return await fetch(url).then(response => response.json());
}
