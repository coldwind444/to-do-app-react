import clsx from "clsx"
import femaleAvt from '../../assets/female_avt.jpg'
import maleAvt from '../../assets/male_avt.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBarsProgress, faFlag, faListCheck, faSearch, faSignOut } from "@fortawesome/free-solid-svg-icons"
import './AppPage.css'
import UnderlineTextBox from "../../components/UnderlineTextBox/UnderlineTextBox"
import { useState } from "react"
import TaskCard from "../../components/TaskCard/TaskCard"

const AppPage = () => {
    const [tab, setTab] = useState(1)

    return (
        <div className={clsx('flex flex-row bg-(--dark-blue-bg) h-screen w-screen p-[15px]')}>
            <div className={clsx('flex flex-col gap-[20px] pl-[10px] pr-[10px]')}>
                <div className={clsx('flex flex-row gap-[15px] h-[160px] w-[300px] bg-(--trinary-blue-card-bg) rounded-[20px] items-center')}>
                    <img src={maleAvt} className={clsx('aspect-square h-[120px] rounded-[20px] ml-[15px]')} />
                    <div className={clsx('flex-1 flex-col h-4/5 items-start gap-[10px]')}>
                        <label className={clsx('text-[rgba(255,255,255,0.8)] font-semibold text-[18px]')}>Welcome back,</label>
                        <h2 className={clsx('text-(--light-blue) text-[22px] font-semibold')}>Peter Parker</h2>
                        <div className={
                            clsx('flex flex-row gap-[8px] items-center mt-[40px] ml-[20px] text-(--orange-red) font-semibold',
                                'logout-btn'
                            )}>
                            <label className="cursor-pointer">Log out</label>
                            <FontAwesomeIcon className="cursor-pointer" icon={faSignOut} />
                        </div>
                    </div>
                </div>
                <div className={clsx('flex flex-1 flex-col gap-[15px] bg-(--trinary-blue-card-bg) rounded-[20px] w-[300px] p-[10px]')}>
                    <label className={clsx('text-(--pale-purple) text-[22px] font-semibold ml-[10px]')}>Add new task</label>
                    <div className={clsx('flex flex-col gap-[5px] ml-[10px] mt-[20px]')}>
                        <label className={clsx('text-white font-medium text-[18px]')}>Name:</label>
                        <div className={
                            clsx('h-[40px] w-[250px] bg-[rgba(0,0,0,0.3)] rounded-[10px] text-white',
                                'border-[rgba(255,255,255,0.5)] border-1 focus-within:border-(--pale-purple) focus-within:border-2',
                                'flex items-center '
                            )}>
                            <input type="text" className={clsx('h-[40px] w-4/5 pl-[20px] outline-none border-none')} />
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
                                <input type="date" className={clsx('h-[40px] w-13/14 pl-[10px] outline-none border-none scheme-dark')} />
                            </div>
                            <div className={
                                clsx('h-[40px] w-[250px] bg-[rgba(0,0,0,0.3)] rounded-[10px] text-white',
                                    'border-[rgba(255,255,255,0.5)] border-1 focus-within:border-(--pale-purple) focus-within:border-2',
                                    'flex items-center '
                                )}>
                                <input type="time" className={clsx('h-[40px] w-13/14 pl-[10px] outline-none border-none scheme-dark')} />
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
                            <textarea rows={5} cols={25} maxLength={23*5} className='resize-none outline-none border-none'></textarea>
                        </div>
                        <label className={clsx('ml-auto mr-[25px] text-white')}>100/100</label>
                    </div>
                    <div className={
                        clsx('ml-auto mr-[20px] h-[40px] w-[100px] text-white font-semibold bg-(--pale-purple) rounded-[10px] flex items-center justify-center',
                            'cursor-pointer hover:opacity-90'
                        )}>
                        Add
                    </div>
                </div>
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
                        <label className={clsx('text-[22px] font-medium text-white')}>Current process: 65%</label>
                        <div className={clsx('h-[15px] w-[450px] bg-(--secondary-blue-card-bg) rounded-[7px] overflow-hidden')}>
                            <div className={clsx('h-[15px] w-4/5 bg-(--light-green)')}></div>
                        </div>
                    </div>
                </div>
                <div className={clsx('flex flex-row gap-[60px] mt-[10px] ml-[10px] items-center')}>
                    <UnderlineTextBox type="text" hint="Search..." icon={faSearch} width="500px" height="50px" fontSize="text-[16px]"
                        hoverbg="rgba(0,0,0,0.3)" lineColor="var(--dark-blue)" />
                    <div className={
                        clsx('flex flex-row gap-[15px] h-[50px] w-[150px] items-center justify-center text-white text-[18px]',
                            'tab', { 'active': tab === 1 }
                        )} onClick={() => setTab(1)}>
                        <FontAwesomeIcon icon={faBarsProgress} />
                        <label>Unfinished</label>
                    </div>
                    <div className={
                        clsx('flex flex-row gap-[15px] h-[50px] w-[150px] items-center justify-center text-white text-[18px]',
                            'tab', { 'active': tab === 2 }
                        )} onClick={() => setTab(2)}>
                        <FontAwesomeIcon icon={faListCheck} />
                        <label>Finished</label>
                    </div>
                </div>
                <div className={clsx('pt-[10px] w-6/7 ml-[10px] overflow-hidden overflow-y-scroll custom-scrollbar')}>
                    <div className={clsx('flex flex-1 flex-col gap-[8px] w-full min-h-full h-fit pb-[20px]')}>
                        <TaskCard name="Do homework after dinner" />
                        <TaskCard name="Do homework after dinner" />
                        <TaskCard name="Do homework after dinner" />
                        <TaskCard name="Do homework after dinner" />
                        <TaskCard name="Do homework after dinner" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppPage