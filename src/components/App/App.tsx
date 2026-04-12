import { keepPreviousData, useQuery } from '@tanstack/react-query'
import css from './App.module.css'
import { fetchNotes } from '../../services/noteService'
import NoteList from '../NoteList/NoteList'
import Pagination from '../Pagination/Pagination'
import { useState } from 'react'
import SearchBox from '../SearchBox/SearchBox'
import Modal from '../Modal/Modal'
import { useDebouncedCallback } from 'use-debounce'
import NoteForm from '../NoteForm/NoteForm';

export default function App() { 

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [note, setIsNote] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  
 
  const handleSearch = useDebouncedCallback((value: string) => {
    setIsNote(value);
    setCurrentPage(1);
  }, 500);


  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, note],
    queryFn: () => fetchNotes(currentPage, note),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;
  
  
  return (
    <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox
                    onSearch={handleSearch}
                />

                {totalPages > 1 && (
                    <Pagination
                        pageCount={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                )}

                <button className={css.button}
                    onClick={() => setModalOpen(true)}
                >
                    Create note +
                </button>
            </header>

            {!isLoading && !isError && notes.length > 0 && (
                <NoteList notes={notes}
                />
            )}

            {modalOpen && (
                <Modal onClose={() =>
                    setModalOpen(false)}>
                    <NoteForm onClose={() =>
                        setModalOpen(false)}
                    />
                </Modal>
            )}
        </div>
    );
}