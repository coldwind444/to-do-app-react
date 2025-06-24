import type { PropsWithChildren } from 'react'
import rocket from '../../../assets/spaceship_3d.png'
import './AuthLayout.css'

const AuthLayout = ({ children }: PropsWithChildren<{}>) => {
    return (
        <div className='flex flex-row bg-(--dark-blue-bg) h-screen w-screen overflow-hidden'>
            <div className='h-full w-4/9'>
                <div className='aspect-square w-[750px] bg-(--light-purple) rounded-full -translate-x-1/4 translate-y-2/6'>
                    <img className='absolute translate-x-14 -translate-y-1/4 h-[750px] aspect-square' src={rocket} />
                </div>
            </div>
            <div className='flex flex-1 flex-col'>
                <div className='flex flex-row w-full mt-[20px]'>
                    <h2 className='text-(--light-green) text-[55px] font-bold mr-[60px]'>
                        TO DO APP !
                    </h2>
                    <div className='translate-y-[10px]'>
                        <div className='bg-(--orange) rounded-full aspect-square w-[65px]'></div>
                        <div className='bg-(--orange-red) rounded-full aspect-square w-[35px] 
                                        translate-x-[40px] -translate-y-[35px]'></div>
                    </div>
                </div>
                <div className='flex-1'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
