import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
} 

const modalRoot = document.getElementById('modal-root') as HTMLElement;

export default function Modal({ children, onClose }: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
      };
      

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleBackdropClick = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>
                {children}
            </div>
        </div>,
modalRoot
    );
}



/*
export default function App() { 

  const [note, setNote] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
 

  const { data, isLoading } = useQuery({
    queryKey: ["notes", note, currentPage],
    queryFn: () => fetchNotes( currentPage, note,),
    placeholderData: keepPreviousData,
  })

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setNote(value);
    setCurrentPage(1);
  }, 300);

  const totalPages = data?.totalPages ?? 0;


  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        { totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> }
        <button onClick={openModal} className={css.button}>Create note +</button>
        {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      </header>
      {data && !isLoading && <NoteList notes={data.notes}/>}
    </div>
  )*/
