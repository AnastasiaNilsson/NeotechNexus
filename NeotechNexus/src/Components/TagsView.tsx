import { useState, useEffect } from 'react';
import { getTagsAsync } from '../Services/ApiService';
import { TagsList } from './TagsList';
import { Tag } from '../Types/Tag';

export const TagsView = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [localisation, setLocalisation] = useState("se");
    const [sortByCategory, setSortByCategory] = useState(true);

    useEffect(() => {
        const fetchTags = async () => {
            setTags([])
            setTags(await getTagsAsync(localisation));
        }
        fetchTags();
    }, [localisation]);

    const handleButtonClick = (id: string) => {
        switch (id) {
            case "By Category": 
                setSortByCategory(true);
                break;
            case "Alphabetically":
                setSortByCategory(false);
                break;
            case "Localisation":
                localisation === "se" ? setLocalisation("en") : setLocalisation("se");
        }
    }

    const dataIsLoaded = (): boolean => {
        return typeof (tags[0]) !== 'undefined';
    }

    return (
        <main className="TagsView flex flex-col gap-4 h-screen bg-slate-900 w-[28rem]">

            <section className="TagsView--Navigation w-full flex justify-between pt-4 px-4">
                <div className="flex gap-1">
                    <button type="button" className={`text-sm text-white px-3 rounded-md border ${sortByCategory ? "border-white" : "border-slate-900"}`} id="By Category" onClick={event => handleButtonClick(event.currentTarget.id)}>
                        {localisation === "en" ? <>By Category</> : <>Efter Kategori</>}
                    </button>
                    <button type="button" className={`text-sm text-white px-3 rounded-md border ${sortByCategory ? "border-slate-900" : "border-white"}`} id="Alphabetically" onClick={event => handleButtonClick(event.currentTarget.id)}>
                        {localisation === "en" ? <>Alphabetically</> : <>Alfabetiskt</>}
                    </button>
                </div>
                <div>
                    <button type="button" className="text-sm text-white px-3 rounded-md border border-slate-900" id="Localisation" onClick={event => handleButtonClick(event.currentTarget.id)}>
                            {localisation === "en" ? <>Svenska</> : <>English</>}
                    </button>
                </div>
                
            </section>
            
            <input className="TagsView--SearchBar rounded-md px-3 py-1 mx-4" type="text" id="TagsView--SearchBar" placeholder={localisation === "en" ? "Search Tags" : "Sök bland taggar"}
                   autoComplete="off" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />

            { dataIsLoaded() && <section className="TagsView--List flex flex-col align-center gap-4 px-4 overflow-auto">
                {
                    sortByCategory ? 
                    
                        <TagsList tags={tags} sortByCategory={true} searchTerm={searchTerm} localisation={localisation} /> 
                        
                    :   <TagsList tags={tags} sortByCategory={false} searchTerm={searchTerm} localisation={localisation} /> 
                }
                </section>
                
            }
        </main>
    )
}
