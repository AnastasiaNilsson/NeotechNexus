import { useEffect, useState } from 'react';
import { Tag } from '../Types/Tag';
import * as _ from 'lodash';
import { TagCard } from './TagCard';


export const TagsList = (props: {tags: Tag[], sortByCategory: boolean, searchTerm: string, localisation: string}) => {

    const [selectedTag, setSelectedTag] = useState(0);
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

    useEffect(() => {
        const filterTags = async () => {
            setFilteredTags(props.tags.filter(tag => tag.name.toLowerCase().includes(props.searchTerm.toLowerCase()) || tag.description.toLowerCase().includes(props.searchTerm.toLowerCase())));
        }
        filterTags();
    }, [props.searchTerm]);
    
    const handleTagClick = (id: number) => {
        if (selectedTag === id) {
            setSelectedTag(0);
        } else {
            setSelectedTag(id);
        }
    }

    return <>
        { 
            props.sortByCategory ?

                <section className="flex flex-col align-center gap-4">
                    {
                        _.chain(filteredTags).groupBy(tag => tag.category)
                                             .map(categoryTags => categoryTags.sort((a, b) => a.name.localeCompare(b.name)))
                                             .value()
                                             .map(categoryTags => (
                                                <section className="flex flex-col align-center gap-4">
                                                    <span className="text-white text-2xl mt-4 self-center">{categoryTags[0].category}</span>
                                                    {
                                                        categoryTags.map(tag => (
                                                            <div key={tag.id} onClick={() => handleTagClick(tag.id)}>
                                                                <TagCard tag={tag} isSelected={selectedTag === tag.id} />
                                                            </div>
                                                        ))
                                                    }
                                                </section>
                                            )
                        )
                    }
                </section>
            
            :   <section className="flex flex-col align-center gap-4">
                    <span className="text-white text-2xl mt-4 self-center">{props.localisation === "en" ? <>All Tags</> : <>Alla Taggar</>}</span>
                    {
                        [...filteredTags].sort((a, b) => a.name.localeCompare(b.name))
                                         .map(tag => (
                                            <div key={tag.id} onClick={() => handleTagClick(tag.id)}>
                                                <TagCard tag={tag} isSelected={selectedTag === tag.id} />
                                            </div>
                        ))
                    }
                </section>
        }
    </>
}
