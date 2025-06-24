import { faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { useState } from "react"
import death from '../../assets/death.png'

type TaskCardProps = {
    name?: string
    deadline?: Date
    note?: string
}

const TaskCard = ({ name, deadline, note }: TaskCardProps) => {
    const [expand, setExpand] = useState(false)

    return (
        <div className={
            clsx('flex flex-col gap-[10px] bg-(--secondary-blue-card-bg) overflow-hidden',
                'w-11/12 rounded-[20px] border border-(--light-purple) p-[10px] cursor-pointer',
                'transition-[height] duration-150 ease-in min-h-[63px]',
                'hover:drop-shadow-[0_2px_5px_rgba(56,189,248,0.4)] transition-all duration-100',
                { 'h-[63px]': !expand, 'h-[250px]': expand }
            )}
            onClick={() => setExpand(prev => !prev)}>
            <div className={clsx('flex flex-row items-center w-full min-w-[63px]')}>
                <label className={clsx('text-white text-[20px] ml-[20px]')}>{name}</label>
                <div className={clsx('flex flex-row gap-[20px] items-center ml-auto mr-[20px]')}>
                    <div className={
                        clsx('text-[rgba(255,255,255,0.7)] hover:scale-120 cursor-pointer',
                            'transition-transform duration-100 ease-in'
                        )}>
                        <FontAwesomeIcon icon={faPen} />
                    </div>
                    <div className={
                        clsx('h-[40px] w-[80px] rounded-[10px] text-white bg-(--medium-blue)',
                            'flex justify-center items-center font-semibold cursor-pointer',
                            'hover:opacity-90 transition-opacity duration-100 ease-in'
                        )}>
                        Done
                    </div>
                    <div className={
                        clsx('text-(--medium-red) font-semibold cursor-pointer hover:opacity-90',
                            'transition-opacity duration-100 ease-in'
                        )}>
                        Remove
                    </div>
                </div>
            </div>
            <div className={clsx('flex flex-row gap-[100px] ml-[20px] mt-[20px]')}>
                <div className={clsx('flex flex-col gap-[5px] bg-(--trinary-blue-card-bg) h-[140px] w-[350px] p-[50px] justify-center relative')}>
                    <label className={clsx('text-(--steel) text-[16px] font-semibold')}>Note:</label>
                    <p className={clsx('text-[rgba(255,255,255,0.8)] font-normal text-justify text-[14px] w-[270px]')}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam
                    </p>
                    <div className={clsx('absolute h-full w-[5px] bg-(--steel) left-0')}></div>
                </div>
                <div className={clsx('flex flex-row gap-[30px] items-center')}>
                    <div className={clsx('flex flex-col gap-[10px]')}>
                        <img className={clsx('aspect-square h-[70px]')} src={death}/>
                        <label className={clsx('text-(--deep-pink) text-[18px] font-semibold')}>Deadline</label>
                    </div>
                    <div className={clsx('text-white flex flex-col gap-[5px] items-center')}>
                        <h2 className={clsx('text-[30px]')}>07 : 00 : 00</h2>
                        <h3 className={clsx('text-[20px]')}>20 - 06 - 2025</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCard