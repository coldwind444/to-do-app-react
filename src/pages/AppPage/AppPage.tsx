import clsx from "clsx"
import femaleAvt from '../../assets/female_avt.jpg'
import maleAvt from '../../assets/male_avt.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBarsProgress, faFlag, faListCheck, faSearch, faSignOut } from "@fortawesome/free-solid-svg-icons"
import './AppPage.css'
import UnderlineTextBox from "../../components/UnderlineTextBox/UnderlineTextBox"
import { useEffect, useRef, useState } from "react"
import TaskCard from "../../components/TaskCard/TaskCard"
import { useUser } from "../../provider/UserContext"
import { useItems } from "../../provider/ItemContext"
import type { UpdateItemRequest } from "../../models/request/update-item"
import { createItem, deleteItem, updateItem } from "../../apis/item"
import { useAuth } from "../../provider/AuthContext"

const AppPage = () => {
    const { jwt, logout } = useAuth()
    const { user } = useUser()
    const { setItems, displayedItems, setDisplayedItems, setKeyword, finished, setFinished, process } = useItems()

    const addFormRef = useRef<HTMLFormElement>(null)

    const [count, setCount] = useState(0)
    const [name, setName] = useState('')
    const [deadline, setDeadline] = useState<Date>(new Date(Date.now() + 1000 * 60 * 60 * 3))
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [note, setNote] = useState('')

    const [isAdding, setIsAdding] = useState(false)

    const handleNoteChange = (s: string) => {
        setNote(s)
        setCount(s.length)
    }

    const create = async () => {
        if (isAdding) return
        try {
            const req = {
                name: name,
                description: note,
                deadline: deadline
            }
            setIsAdding(true)
            const res = await createItem(jwt, req)
            if (res.status === 200) {
                addFormRef.current?.reset()
                setDisplayedItems(prev => [...prev, res.data])
            }
        } catch (e) {
            console.error('Create failed.', e)
        } finally {
            setIsAdding(false)
        }
    }

    useEffect(() => {
        const [year, month, day] = date.split('-').map(Number)
        const [hr, min] = time.split(':').map(Number)
        setDeadline(new Date(year, month - 1, day, hr, min))
    }, [time, date])

    const update = async (req: UpdateItemRequest) => {
        try {
            console.log(req)
            console.log(user?.id)
            const res = await updateItem(jwt, req)
            if (res.status === 200)
                setItems(prev => prev.map(
                    item => item.id === req.id ?
                        {
                            ...item,
                            name: req.name ?? item.name,
                            deadline: req.deadline ?? item.deadline,
                            description: req.description ?? item.description,
                            isDone: req.isDone ?? item.isDone,
                            finishedDate: req.finishedDate ?? item.finishedDate
                        }
                        : item
                ))
        } catch (e) {
            console.error('Update failed.', e)
        }
    }

    const remove = async (id: number) => {
        try {
            const res = await deleteItem(jwt, id)
            if (res.status === 200) setItems(prev => prev.filter(item => item.id != id))
        } catch (e) {
            console.error('Delete failed.', e)
        }
    }

    return (
        <div className={clsx('flex flex-row bg-(--dark-blue-bg) h-screen w-screen p-[15px]')}>
            <div className={clsx('flex flex-col gap-[20px] pl-[10px] pr-[10px]')}>
                <div className={clsx('flex flex-row gap-[15px] h-[160px] w-[300px] bg-(--trinary-blue-card-bg) rounded-[20px] items-center')}>
                    <img src={user?.gender ? maleAvt : femaleAvt} className={clsx('aspect-square h-[120px] rounded-[20px] ml-[15px]')} />
                    <div className={clsx('flex-1 flex-col h-4/5 items-start gap-[10px]')}>
                        <label className={clsx('text-[rgba(255,255,255,0.8)] font-semibold text-[18px]')}>Welcome back,</label>
                        <h2 className={clsx('text-(--light-blue) text-[22px] font-semibold')}>
                            {user ? `${user.fname} ${user.lname}` : 'null'}
                        </h2>
                        <div className={
                            clsx('flex flex-row gap-[8px] items-center mt-[40px] ml-[20px] text-(--orange-red) font-semibold',
                                'logout-btn'
                            )} onClick={() => logout()}>
                            <label className="cursor-pointer">Log out</label>
                            <FontAwesomeIcon className="cursor-pointer" icon={faSignOut} />
                        </div>
                    </div>
                </div>
                <form ref={addFormRef} className={clsx('flex flex-1 flex-col gap-[15px] bg-(--trinary-blue-card-bg) rounded-[20px] w-[300px] p-[10px]')}>
                    <label className={clsx('text-(--pale-purple) text-[22px] font-semibold ml-[10px]')}>Add new task</label>
                    <div className={clsx('flex flex-col gap-[5px] ml-[10px] mt-[20px]')}>
                        <label className={clsx('text-white font-medium text-[18px]')}>Name:</label>
                        <div className={
                            clsx('h-[40px] w-[250px] bg-[rgba(0,0,0,0.3)] rounded-[10px] text-white',
                                'border-[rgba(255,255,255,0.5)] border-1 focus-within:border-(--pale-purple) focus-within:border-2',
                                'flex items-center '
                            )}>
                            <input onChange={(e) => setName(e.target.value)} type="text" className={clsx('h-[40px] w-4/5 pl-[20px] outline-none border-none')} />
                        </div>
                    </div>
                    <div className={clsx('flex flex-col gap-[5px] ml-[10px]')}>
                        <label className={clsx('text-white font-medium text-[18px]')}>Deadline:</label>
                        <div className={clsx('flex flex-col gap-[10px]')}>
                            <div className={
                                clsx('h-[40px] w-[250px] bg-[rgba(0,0,0,0.3)] rounded-[10px] text-white',
                                    'border-[rgba(255,255,255,0.5)] border-1 focus-within:border-(--pale-purple) focus-within:border-2',
                                    'flex items-center '
                                )}>
                                <input onChange={e => setDate(e.target.value)} type="date" className={clsx('h-[40px] w-13/14 pl-[10px] outline-none border-none scheme-dark')} />
                            </div>
                            <div className={
                                clsx('h-[40px] w-[250px] bg-[rgba(0,0,0,0.3)] rounded-[10px] text-white',
                                    'border-[rgba(255,255,255,0.5)] border-1 focus-within:border-(--pale-purple) focus-within:border-2',
                                    'flex items-center '
                                )}>
                                <input onChange={e => setTime(e.target.value)} type="time" className={clsx('h-[40px] w-13/14 pl-[10px] outline-none border-none scheme-dark')} />
                            </div>
                        </div>
                    </div>
                    <div className={clsx('flex flex-col gap-[5px] ml-[10px]')}>
                        <label className={clsx('text-white font-medium text-[18px]')}>Note:</label>
                        <div className={
                            clsx('h-[130px] w-[250px] bg-[rgba(0,0,0,0.3)] rounded-[10px] text-white',
                                'border-[rgba(255,255,255,0.5)] border-1 focus-within:border-(--pale-purple) focus-within:border-2',
                                'flex items-center justify-center'
                            )}>
                            <textarea rows={5} cols={25} maxLength={23 * 5} className='resize-none outline-none border-none'
                                onChange={(e) => handleNoteChange(e.target.value)}></textarea>
                        </div>
                        <label className={clsx('ml-auto mr-[25px] text-white')}>{`${count}/100`}</label>
                    </div>
                    <div className={
                        clsx('ml-auto mr-[20px] h-[40px] w-[100px] text-white font-semibold bg-(--pale-purple) rounded-[10px] flex items-center justify-center',
                            'cursor-pointer hover:opacity-90',
                            { 'disabled': !(name.length > 0 && date.length > 0 && time.length > 0 && count <= 100 && count > 0 && !isAdding) }
                        )} onClick={() => create()}>
                        Add
                    </div>
                    <div className={clsx('bottom-0 absolute -translate-y-[40px] translate-x-[30px]', { 'invisible': !isAdding })}>
                        <span className={clsx('loader h-[30px] w-[30px]')}></span>
                    </div>
                </form>
            </div>
            <div className={clsx('flex flex-1 flex-col gap-[15px] pl-[10px]')}>
                <div className={clsx('flex flex-row items-center bg-(--trinary-blue-card-bg) rounded-[20px] min-h-[200px] w-4/5')}>
                    <div className={clsx('flex flex-col gap-[15px] ml-[30px]')}>
                        <div className={clsx('flex flex-row gap-[60px]')}>
                            <h1 className={clsx('text-(--light-green) font-bold')}>TO DO APP !</h1>
                            <div>
                                <div className={clsx('aspect-square h-[50px] bg-(--orange) rounded-full')}></div>
                                <div className={
                                    clsx('aspect-square h-[25px] bg-(--orange-red) rounded-full absolute',
                                        'translate-x-[35px] -translate-y-[25px]'
                                    )}></div>
                            </div>
                        </div>
                        <p className={clsx('w-[330px] text-white font-normal')}>
                            You have lots of tasks to do and don’t want to miss anything ?
                            Let’s make a checklist and set deadlines for them !
                        </p>
                    </div>
                    <div className={clsx('flex flex-1 items-center flex-col gap-[15px]')}>
                        <FontAwesomeIcon className={clsx('text-[35px] text-white')} icon={faFlag} />
                        <label className={clsx('text-[22px] font-medium text-white')}>{`Current process: ${process}%`}</label>
                        <div className={clsx('h-[15px] w-[450px] bg-(--secondary-blue-card-bg) rounded-[7px] overflow-hidden')}>
                            <div className={clsx('h-[15px] bg-(--light-green)')} 
                                style={{ width: `${process}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className={clsx('flex flex-row gap-[60px] mt-[10px] ml-[10px] items-center')}>
                    <UnderlineTextBox type="text" hint="Search..." icon={faSearch} width="500px" height="50px" fontSize="text-[16px]"
                        hoverbg="rgba(0,0,0,0.3)" lineColor="var(--dark-blue)" onChange={(e) => setKeyword(e.target.value)} />
                    <div className={
                        clsx('flex flex-row gap-[15px] h-[50px] w-[150px] items-center justify-center text-white text-[18px]',
                            'tab', { 'active': !finished }
                        )} onClick={() => setFinished(false)}>
                        <FontAwesomeIcon icon={faBarsProgress} />
                        <label>Unfinished</label>
                    </div>
                    <div className={
                        clsx('flex flex-row gap-[15px] h-[50px] w-[150px] items-center justify-center text-white text-[18px]',
                            'tab', { 'active': finished }
                        )} onClick={() => setFinished(true)}>
                        <FontAwesomeIcon icon={faListCheck} />
                        <label>Finished</label>
                    </div>
                </div>
                <div className={clsx('pt-[10px] w-6/7 ml-[10px] overflow-hidden overflow-y-scroll custom-scrollbar')}>
                    <div className={clsx('flex flex-1 flex-col gap-[8px] w-full min-h-full h-fit pb-[20px] pl-[15px]')}>
                        {displayedItems.map(it => (
                            <TaskCard item={it} key={it.id} update={update} remove={remove} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppPage