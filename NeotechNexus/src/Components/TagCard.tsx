import { Tag } from "../Types/Tag";

export const TagCard = (props: {tag: Tag, isSelected: boolean}) => {

    const getCategoryColor = (categoryName: string): string => {

        switch (categoryName) {

            case "General":
            case "Allmänt": 
                return "fuchsia-500";

            case "Augment":
                return "indigo-800";

            case "Auton":
                return "slate-500";

            case "Creme":
            case "Kräm":
                return "yellow-400";

            case "Deck":
                return "teal-200";

            case "Protection":
            case "Skydd":
                return "cyan-600";

            case "Sensor":
                return "green-300";

            case "Style":
            case "Stil":
                return "lime-400";

            case "Weapon":
            case "Vapen":
                return "red-600";

            default:
                return "";
        } 
    }

    return (
            <article className="rounded-md flex flex-row bg-white">
                <div className={`w-6 h-50 rounded-l-md bg-gradient-to-r from-${getCategoryColor(props.tag.category)}`} />
                <div className="p-2 -ml-4 w-full h-full flex flex-col">
                    <div className="flex justify-between align-center">
                        <h1 className="text-xl">{props.tag.name}</h1>
                        <p className={`mt-0.5 px-2 w-24 text-center border-2 rounded-md border-${getCategoryColor(props.tag.category)}`}>{props.tag.category}</p>
                    </div>
                    { 
                    props.isSelected && <p className={`p-4`}>{props.tag.description}</p>
                    }
                </div>
            </article>  
    )
}
