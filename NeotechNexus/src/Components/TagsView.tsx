import { useState, useEffect } from 'react';
import { getTagsAsync } from '../Services/ApiService';
import { Tag } from '../Types/Tag';

export const TagsView = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByCategory, setSortByCategory] = useState(false)
    const [expandedTag, setExpandedTag] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            setTags(await getTagsAsync("se"));
        }
        fetchData();
    }, [searchTerm]);

    const handleButtonClick = (id: string) => {
        if (id == "By Category") {
            setSortByCategory(true);
        } else {
            setSortByCategory(false);
        }
    }

    const handleTagClick = (id: number) => {
        if (expandedTag === id) {
            setExpandedTag(0);
        } else {
            setExpandedTag(id);
        }
    }

    const dataIsLoaded = (): boolean => {
        return typeof (tags[0]) !== 'undefined';
    }

    return (
        <main className="TagsView flex flex-col p-4 gap-4">

            <div className="TagsView--SortButtons main--s w-full flex justify-center gap-8">
                <button type="button" className="text-white border-white rounded" id="Alphabetically" onClick={event => handleButtonClick(event.currentTarget.id)}>Alphabetically</button>
                <button type="button" className="text-white border-white rounded" id="By Category" onClick={event => handleButtonClick(event.currentTarget.id)}>By Category</button>
            </div>
            
            <input className="TagsView--SearchBar rounded-md px-3 py-1" type="text" id="TagsView--SearchBar" placeholder="Search Tags" 
                   autoComplete="off" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />

            { dataIsLoaded() && <section className="TagsView--List flex flex-col align-center gap-4">
                {
                    sortByCategory ? <span className="align-center text-white border-solid border-white">Feature not yet implemented.</span> :

                    tags.filter(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()) || tag.description.toLowerCase().includes(searchTerm.toLowerCase()))
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(tag => (
                        <article className="TagsView--List--Tag bg-white rounded-md p-4 flex flex-col gap-4" key={tag.id} onClick={() => handleTagClick(tag.id)}>
                            <div className="flex justify-between align-center">
                                <h1 className="text-xl">{tag.name}</h1>
                                <p className="mt-0.5 px-1 bg-red-600 border border-slate-800 rounded">{tag.category}</p>
                            </div>
                            
                            { expandedTag === tag.id && <p>{tag.description}</p> }
                        </article>
                    ))
                }
                </section>
            }
        </main>
    )
}
