import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { Steps } from "../../components/Steps/Steps"
import { useEffect, useRef, useState } from "react"
import './ResetPassword.css'
import { useNavigate } from "react-router-dom"
import { confirmOtp, requestOtp, resetPassword } from "../../apis/auth"

export const ResetPasswordPage = () => {
    const navigate = useNavigate()
    const [userid, setUserid] = useState(0)

    const formS1Ref = useRef<HTMLFormElement>(null)
    const formS2Ref = useRef<HTMLFormElement>(null)
    const formS3Ref = useRef<HTMLFormElement>(null)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [loadingS1, setLoadingS1] = useState(false)

    const [otp, setOtp] = useState('')
    const [loadingS2, setLoadingS2] = useState(false)
    const [token, setToken] = useState('')

    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loadingS3, setLoadingS3] = useState(false)

    const [time, setTime] = useState(15 * 60)
    const [isActive, setIsActive] = useState(false)

    const [step, setStep] = useState(1)

    const resetForms = () => {
        formS1Ref.current?.reset()
        formS2Ref.current?.reset()
        formS3Ref.current?.reset()
    }

    const handleSendOTP = async () => {
        if (loadingS1) return
        try {
            setLoadingS1(true)
            const res = await requestOtp({
                username: username,
                email: email
            })
            if (res.status === 200) {
                setStep(2)
                setUserid(res.data.userid)
                startCountDown()
            }
        } catch (e) {
            console.error('Send OTP failed.', e)
        } finally {
            setLoadingS1(false)
        }
    }

    const handleVerifyOTP = async () => {
        if (loadingS2) return
        if (!userid) return
        try {
            setLoadingS2(true)
            const res = await confirmOtp({
                otp: Number.parseInt(otp),
                userid: userid
            })
            if (res.status === 200) {
                setToken(res.data)
                setStep(3)
            }
        } catch (e) {
            console.error('Verify OTP failed.', e)
        } finally {
            setLoadingS2(false)
        }
    }

    const handleResetPassword = async () => {
        if (loadingS3) return
        if (!userid) return
        try {
            setLoadingS3(true)
            const res = await resetPassword({
                token: token,
                password: password,
                userid: userid
            })
            if (res.status === 200) {
                setStep(3)
                stopAndResetCountDown()
                navigate('/')
                resetForms()
            }
        } catch (e) {
            console.error('Reset failed.', e)
        } finally {
            setLoadingS3(false)
        }
    }

    const startCountDown = () => {
        setTime(15 * 60)
        setIsActive(true)
    }

    const stopAndResetCountDown = () => {
        setIsActive(false)
        setTime(15 * 60)
    }

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        if (!isActive || time <= 0) return
        const interval = setInterval(() => setTime(prev => prev - 1), 1000)
        return () => clearInterval(interval)
    }, [isActive, time])

    return (
        <div className={clsx('flex flex-col h-full w-full')}>
            <div className={
                clsx('flex flex-row gap-[10px] items-center justify-center text-white font-medium text-[21px]',
                    'cursor-pointer hover:gap-[20px] transition-[gap] duration-100 ease-in w-[250px] mb-[40px]'
                )} onClick={() => { resetForms(); navigate('/') }}>
                <FontAwesomeIcon icon={faAngleLeft} />
                <label>Back to authentication</label>
            </div>
            <Steps step={step} />
            <div className={clsx('bg-[#262634] rounded-[10px] mt-[30px] h-[400px] w-[600px] overflow-hidden')}>
                <div className={clsx('flex flex-row h-full w-3/1 reset-slider', { 'first': step === 1, 'second': step === 2, 'third': step === 3 })}>
                    <form ref={formS1Ref} className={clsx('flex flex-col h-full w-1/3 items-center')}>
                        <label className={clsx('text-[rgba(255,255,255,0.8)] font-semibold text-[25px] mt-[20px]')}>Send OTP</label>
                        <div className={clsx('flex flex-col gap-[10px] mt-[40px]')}>
                            <div className={
                                clsx('flex items-center justify-center h-[40px] w-[350px] text-white',
                                    'border-2 border-[rgba(255,255,255,0.3)] rounded-[10px]',
                                    'focus-within:border-[#7B44FA]'
                                )}>
                                <input placeholder="Email" type="text" className={clsx('w-9/10 h-full border-none outline-none')}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className={
                                clsx('flex items-center justify-center h-[40px] w-[350px] text-white',
                                    'border-2 border-[rgba(255,255,255,0.3)] rounded-[10px]',
                                    'focus-within:border-[#7B44FA]'
                                )}>
                                <input placeholder="Username" type="text" className={clsx('w-9/10 h-full border-none outline-none')}
                                    onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className={
                                clsx('flex items-center justify-center h-[40px] rounded-[10px]',
                                    {
                                        'text-white bg-[#7B44FA] hover:opacity-90 cursor-pointer': username.length >= 8 && email.length >= 10,
                                        'text-gray-700 bg-[#B29DFB]': username.length < 8 || email.length < 10
                                    })} onClick={() => handleSendOTP()}>
                                Send
                            </div>
                            <div className={clsx('loader w-[30px] h-[30px] ml-auto mr-auto mt-[10px]', { 'invisible': !loadingS1 })}></div>
                        </div>
                    </form>
                    <form ref={formS2Ref} className={clsx('flex flex-col h-full w-1/3 items-center')}>
                        <label className={clsx('text-[rgba(255,255,255,0.8)] font-semibold text-[25px] mt-[20px]')}>Verify OTP</label>
                        <p className={clsx('text-[rgba(255,255,255,0.6)] w-[290px] text-center')}>We have sent an OTP to your email. Please confirm it.</p>
                        <div className={clsx('flex flex-col gap-[10px] mt-[50px]')}>
                            <span className={clsx('text-[rgba(255,255,255,0.7)] font-normal text-[14px] ml-[10px]')}>
                                {'Haven\'t received yet ? '}
                                <span className={clsx('text-(--medium-blue) hover:underline cursor-pointer')}
                                    onClick={() => handleSendOTP()}>
                                    Resend OTP
                                </span>
                            </span>
                            <div className={
                                clsx('flex items-center justify-center h-[40px] w-[350px] text-white',
                                    'border-2 border-[rgba(255,255,255,0.3)] rounded-[10px]',
                                    'focus-within:border-[#7B44FA]'
                                )}>
                                <input placeholder="Enter OTP" type="text" className={clsx('w-9/10 h-full border-none outline-none')}
                                    onChange={(e) => setOtp(e.target.value)} maxLength={6} />
                            </div>
                            <div className={
                                clsx('flex items-center justify-center h-[40px] rounded-[10px]',
                                    {
                                        'text-white bg-[#7B44FA] hover:opacity-90 cursor-pointer': otp.length === 6,
                                        'text-gray-700 bg-[#B29DFB]': otp.length < 6
                                    })} onClick={() => handleVerifyOTP()}>
                                Confirm
                            </div>
                            <span className={clsx('text-(--medium-red) ml-auto mr-auto')}>{`Expires in ${formatTime(time)}`}</span>
                            <div className={clsx('loader w-[30px] h-[30px] ml-auto mr-auto mt-[10px]', { 'invisible': !loadingS2 })}></div>
                        </div>
                    </form>
                    <form ref={formS3Ref} className={clsx('flex flex-col h-full w-1/3 items-center')}>
                        <label className={clsx('text-[rgba(255,255,255,0.8)] font-semibold text-[25px] mt-[20px]')}>Reset password</label>
                        <div className={clsx('flex flex-col gap-[10px] mt-[50px]')}>
                            <div className={
                                clsx('flex items-center justify-center h-[40px] w-[350px] text-white',
                                    'border-2 border-[rgba(255,255,255,0.3)] rounded-[10px]',
                                    'focus-within:border-[#7B44FA]'
                                )}>
                                <input placeholder="New password" type="password" className={clsx('w-9/10 h-full border-none outline-none scheme-dark')}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className={
                                clsx('flex items-center justify-center h-[40px] w-[350px] text-white',
                                    'border-2 border-[rgba(255,255,255,0.3)] rounded-[10px]',
                                    'focus-within:border-[#7B44FA]'
                                )}>
                                <input placeholder="Confirm password" type="password" className={clsx('w-9/10 h-full border-none outline-none scheme-dark')}
                                    onChange={(e) => setConfirm(e.target.value)} />
                            </div>
                            <div className={clsx('text-white flex flex-row gap-[10px] items-center ml-auto')}>
                                <input className='cursor-pointer' type="checkbox" id='checkbox' />
                                <label htmlFor="checkbox">Show password</label>
                            </div>
                            <div className={clsx('flex flex-row gap-[15px] mt-[20px]')}>
                                <div className={
                                    clsx('flex cursor-pointer hover:opacity-90 text-(--medium-red) items-center justify-center',
                                        'bg-[#1F1F2E] border-2 border-[rgba(255,255,255,0.15)] w-[150px] h-[40px] rounded-[10px]'
                                    )} onClick={() => setStep(1)}>
                                    Cancel
                                </div>
                                <div className={
                                    clsx('flex-1 flex items-center justify-center h-[40px] rounded-[10px]',
                                        {
                                            'text-white bg-[#7B44FA] hover:opacity-90 cursor-pointer': password.length >= 8 && password === confirm,
                                            'text-gray-700 bg-[#B29DFB]': password.length < 8 || password !== confirm
                                        })} onClick={() => handleResetPassword()}>
                                    Reset
                                </div>
                            </div>
                            <div className={clsx('loader w-[30px] h-[30px] ml-auto mr-auto mt-[10px]', { 'invisible': !loadingS3 })}></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}