import css from './SearchBox.module.css';



export default function SearchBox({ onSearch }: { onSearch: (query: string) => void }) { 


    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSearch(event.target.value)}
        />

    )
}