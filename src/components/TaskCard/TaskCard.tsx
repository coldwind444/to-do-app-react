import { faAngleDown, faCheck, faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { useState } from "react"
import death from '../../assets/death.png'
import type { ItemResponse } from "../../models/response/item"
import type { UpdateItemRequest } from "../../models/request/update-item"
import { Fragment } from "react"

type TaskCardProps = {
    update: (req: UpdateItemRequest) => Promise<void>
    remove: (id: number) => Promise<void>
    item: ItemResponse | undefined
}

type FormattedDateTime = {
    withSpace: string
    noSpace: string
}

const TaskCard = ({ item, update, remove }: TaskCardProps) => {
    const [expand, setExpand] = useState(false)
    const [editable, setEditable] = useState(false)

    const [name, setName] = useState(item ? item.name : '')
    const [note, setNote] = useState(item ? item.description : '')
    const [deadline, setDeadline] = useState(item ? item.deadline : '')

    const handleDeadlineChange = (time?: string, date?: string) => {
        if (!item) return
        setDeadline(`${date}T${time}`)
    }

    const handleUpdateData = async () => {
        setEditable(prev => !prev)

        if (!editable) setExpand(true)

        if (!item || editable) return

        const req = {
            id: item.id,
            name: name,
            description: note,
            deadline: deadline
        }

        await update(req)
    }

    const handleRemove = () => {
        if (!item) return
        remove(item.id)
    }

    const handleCheck = async () => {
        if (!item) return

        const req = {
            id: item.id,
            isDone: true,
            finishedDate: new Date().toISOString()
        }

        await update(req)
    }

    const formattingDate = ( input?: string ): FormattedDateTime => {
        if (!input) return { withSpace: '', noSpace: '' }
        const dt = new Date(input)
        const day = String(dt.getDate()).padStart(2, '0')
        const month = String(dt.getMonth() + 1).padStart(2, '0')
        const year = dt.getFullYear()

        return {
            withSpace: `${day} - ${month} - ${year}`,
            noSpace: `${year}-${month}-${day}`
        }
    }

    const formattingTime = ( input?: string ): FormattedDateTime => {
        if (!input) return { withSpace: '', noSpace: '' }
        const dt = new Date(input)
        const hour = String(dt.getHours()).padStart(2, '0')
        const min = String(dt.getMinutes()).padStart(2, '0')

        return {
            withSpace: `${hour} : ${min}`,
            noSpace: `${hour}:${min}`
        }
    }

    return (
        <div className={
            clsx('flex flex-col gap-[10px] bg-(--secondary-blue-card-bg) overflow-hidden',
                'w-11/12 rounded-[20px] border border-(--light-purple) p-[10px] cursor-pointer',
                'transition-[height] duration-150 ease-in min-h-[63px]',
                'hover:drop-shadow-[0_2px_5px_rgba(56,189,248,0.4)] transition-all duration-100',
                { 'h-[63px]': !expand, 'h-[250px]': expand }
            )}>
            <div className={clsx('flex flex-row w-full items-center')}>
                {editable ?
                    <div className={clsx('text-white text-[20px] ml-[20px]')}>
                        <input className={clsx('outline-none border-2 border-[rgba(255,255,255,0.2)] w-[300px] p-[5px] rounded-[5px]')}
                            defaultValue={item ? item?.name : 'null'} type="text" onChange={(e) => setName(e.target.value)} />
                    </div> :
                    <label className={clsx('text-white text-[20px] ml-[20px]')}>{item ? item.name : 'null'}</label>
                }
                <div className={clsx('flex flex-row gap-[30px] items-center ml-auto mr-[20px]')}>
                    { item?.isDone ? 
                    (<Fragment>
                        <div className={clsx('text-[rgba(255,255,255,0.7)] h-[43px] text-[16px] flex items-center')}>
                            <label>
                                {`Finished at ${formattingTime(item?.finishedDate).noSpace} ${formattingDate(item?.finishedDate).noSpace}`}
                            </label>
                        </div>
                        <div className={clsx('text-[#14AE5C] text-[20px] h-[43px] flex items-center justify-center')} >
                            <FontAwesomeIcon icon={faCheck}/>
                        </div>
                    </Fragment>):
                    (<Fragment>
                        <div className={
                            clsx('text-white cursor-pointer transition-[rotate] duration-200 ease-in',
                                { 'rotate-180': expand }
                            )} onClick={() => setExpand(prev => !prev)}>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                        <div className={
                            clsx('text-white hover:scale-120 cursor-pointer',
                                'transition-transform duration-100 ease-in'
                            )} onClick={() => handleUpdateData()}>
                            <FontAwesomeIcon icon={editable ? faCheck : faPen} />
                        </div>
                        <div className={
                            clsx('h-[40px] w-[80px] rounded-[10px] text-white bg-(--medium-blue)',
                                'flex justify-center items-center font-semibold cursor-pointer',
                                'hover:opacity-90 transition-opacity duration-100 ease-in'
                            )} onClick={() => handleCheck()}>
                            Done
                        </div>
                        <div className={
                            clsx('text-(--medium-red) font-semibold cursor-pointer hover:opacity-90',
                                'transition-opacity duration-100 ease-in'
                            )} onClick={() => handleRemove()}>
                            Remove
                        </div>
                    </Fragment>)}
                </div>
            </div>
            <div className={clsx('flex flex-row gap-[100px] ml-[20px] mt-[20px]')}>
                <div className={clsx('flex flex-col gap-[5px] bg-(--trinary-blue-card-bg) h-[140px] w-[350px] justify-start relative')}>
                    <label className={clsx('text-(--steel) ml-[30px] mt-[10px] text-[16px] font-semibold')}>Note:</label>
                    {editable ?
                        <div className={clsx('text-[rgba(255,255,255,0.8)] ml-[30px] font-normal text-justify text-[14px] w-[270px]')}>
                            <textarea className={clsx('resize-none outline-none border-2 border-[rgba(255,255,255,0.2)] p-[5px] rounded-[5px]')}
                                cols={35} rows={3} maxLength={130} defaultValue={item ? item.description : ''}
                                onChange={(e) => setNote(e.target.value)}></textarea>
                        </div> :
                        <p className={clsx('text-[rgba(255,255,255,0.8)] ml-[30px] font-normal text-justify text-[14px] h-[120px] w-[270px]')}>
                            {item ? item.description : 'null'}
                        </p>
                    }
                    <div className={clsx('absolute h-full w-[5px] bg-(--steel) left-0')}></div>
                </div>
                <div className={clsx('flex flex-row gap-[30px] items-center')}>
                    <div className={clsx('flex flex-col gap-[10px]')}>
                        <img className={clsx('aspect-square h-[70px]')} src={death} />
                        <label className={clsx('text-(--deep-pink) text-[18px] font-semibold')}>Deadline</label>
                    </div>
                    <div className={clsx('text-white flex flex-col gap-[5px] items-center')}>
                        {editable ?
                            <div className={clsx('text-[30px]')}>
                                <input defaultValue={formattingTime(item?.deadline).noSpace} type="time" className='scheme-dark'
                                    onChange={(e) => handleDeadlineChange(e.target.value)} />
                            </div> :
                            <h2 className={clsx('text-[30px]')}>
                                {
                                    item ? formattingTime(item?.deadline).withSpace
                                        : 'null'
                                }
                            </h2>
                        }
                        {editable ?
                            <div className={clsx('text-[20px]')}>
                                <input defaultValue={formattingDate(item?.deadline).noSpace} type="date" className='scheme-dark'
                                    onChange={(e) => handleDeadlineChange(undefined, e.target.value)} />
                            </div> :
                            <h3 className={clsx('text-[20px]')}>
                                {
                                    item ? formattingDate(item?.deadline).withSpace :
                                        'null'
                                }
                            </h3>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCard