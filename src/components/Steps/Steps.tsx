import clsx from "clsx"
import './Steps.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

type StepsProps = {
    step: number
}

export const Steps = ({ step }: StepsProps) => {

    return (
        <div className={clsx('flex flex-row')}>
            <div className={clsx('flex flex-col gap-[10px] items-center')}>
                <div className={
                    clsx('flex items-center justify-center p-[7px] rounded-full',
                        { 'bg-[#402C77] backdrop-blur-2xl': step === 1 }
                    )}>
                    <div className={
                        clsx('h-[40px] aspect-square rounded-full flex items-center text-[20px] justify-center',
                            {
                                'bg-[#7B44FA] text-white': step > 1,
                                'bg-[#2E2E3F] border-[2px] border-[#7b44fa] text-[#7b44fa]': step === 1,
                                'bg-[#2e2e3f] text-[rgba(255,255,255,0.3)]': step < 1
                            }
                        )}>
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                </div>
                <div className={clsx('flex flex-col items-center')}>
                    <label className={
                        clsx('font-bold text-[21px]',
                            {
                                'text-white': step >= 1,
                                'text-[rgba(255,255,255,0.5)]': step < 1
                            })}>Step 1
                    </label>
                    <label className={
                        clsx('text-[16px] font-medium',
                            {
                                'text-[rgba(255,255,255,0.8)]': step >= 1,
                                'text-[rgba(255,255,255,0.3)]': step < 1
                            })}>Send OTP
                    </label>
                </div>
            </div>
            <div className={clsx('h-[3px] bg-[#2E2E3F] w-[200px] -ml-[8px] translate-y-[25px]')}>
                <div className={clsx('h-full bg-[#7B44FA] transition-[width] duration-200', { 'w-1/2': step === 1, 'w-full': step > 1})}></div>
            </div>
            <div className={clsx('flex flex-col gap-[10px] items-center -ml-[12px]')}>
                <div className={
                    clsx('flex items-center justify-center p-[7px] rounded-full',
                        { 'bg-[#402C77] backdrop-blur-2xl': step === 2 }
                    )}>
                    <div className={
                        clsx('h-[40px] aspect-square rounded-full flex items-center text-[20px] justify-center',
                            {
                                'bg-[#7B44FA] text-white': step > 2,
                                'bg-[#2E2E3F] border-[2px] border-[#7b44fa] text-[#7b44fa]': step === 2,
                                'bg-[#2e2e3f] text-[rgba(255,255,255,0.3)]': step < 2
                            }
                        )}>
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                </div>
                <div className={clsx('flex flex-col items-center')}>
                    <label className={
                        clsx('font-bold text-[21px]',
                            {
                                'text-white': step >= 2,
                                'text-[rgba(255,255,255,0.5)]': step < 2
                            })}>Step 2
                    </label>
                    <label className={
                        clsx('text-[16px] font-medium',
                            {
                                'text-[rgba(255,255,255,0.8)]': step >= 2,
                                'text-[rgba(255,255,255,0.3)]': step < 2
                            })}>Verify OTP
                    </label>
                </div>
            </div>
            <div className={clsx('h-[3px] bg-[#2E2E3F] w-[200px] -ml-[10px] translate-y-[25px]')}>
                <div className={clsx('h-full bg-[#7B44FA] transition-[width] duration-200', { 'w-0': step < 2 ,'w-1/2': step === 2, 'w-full': step > 2})}></div>
            </div>
            <div className={clsx('flex flex-col gap-[10px] -ml-[30px] items-center')}>
                <div className={
                    clsx('flex items-center justify-center p-[7px] rounded-full',
                        { 'bg-[#402C77] backdrop-blur-2xl': step === 3 }
                    )}>
                    <div className={
                        clsx('h-[40px] aspect-square rounded-full flex items-center text-[20px] justify-center',
                            {
                                'bg-[#7B44FA] text-white': step > 3,
                                'bg-[#2E2E3F] border-[2px] border-[#7b44fa] text-[#7b44fa]': step === 3,
                                'bg-[#2e2e3f] text-[rgba(255,255,255,0.3)]': step < 3
                            }
                        )}>
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                </div>
                <div className={clsx('flex flex-col items-center')}>
                    <label className={
                        clsx('font-bold text-[21px]',
                            {
                                'text-white': step >= 3,
                                'text-[rgba(255,255,255,0.5)]': step < 3
                            })}>Step 3
                    </label>
                    <label className={
                        clsx('text-[16px] font-medium',
                            {
                                'text-[rgba(255,255,255,0.8)]': step >= 3,
                                'text-[rgba(255,255,255,0.3)]': step < 3
                            })}>Reset password
                    </label>
                </div>
            </div>
        </div>
    )
}
