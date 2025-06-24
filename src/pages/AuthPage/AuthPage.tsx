import { useState } from "react"
import clsx from "clsx"
import './AuthPage.css'
import UnderlineTextBox from "../../components/UnderlineTextBox/UnderlineTextBox"
import { faCheck, faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import google from '../../assets/google.png'

const AuthPage = () => {
    const [tab, setTab] = useState(1)

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex flex-row h-1/7 w-full pt-[10px]">
                <div className={
                    clsx("text-white text-[22px] font-semibold ml-[10px]",
                        'underlined-tab',
                        { 'active': tab === 1 }
                    )} id="tab1"
                    onClick={() => setTab(1)}>
                    <label className="cursor-pointer">Log in</label>
                </div>
                <div className={
                    clsx("text-white text-[22px] font-semibold",
                        'underlined-tab',
                        { 'active': tab === 2 }
                    )} id="tab1"
                    onClick={() => setTab(2)}>
                    <label className="cursor-pointer">Create account</label>
                </div>
            </div>
            <div className="flex-1">
                <div className={
                    clsx("bg-(--secondary-blue-card-bg) w-[750px] h-[500px] rounded-[20px] overflow-hidden"

                    )}>
                    <div className={
                        clsx("flex flex-row h-full w-2/1",
                            'slider',
                            { 'first-slide': tab === 1, 'second-slide': tab === 2 }
                        )}>
                        <div className={clsx('flex flex-row w-1/2')}>
                            <div className={clsx('flex flex-col')}>
                                <label className={clsx('text-(--orange) text-[35px] font-semibold ml-[50px] mt-[20px]')}>
                                    Log in
                                </label>
                                <div className={clsx('flex flex-col ml-[50px] mt-[50px] gap-[15px]')}>
                                    <UnderlineTextBox icon={faUser} hint="Username" type="text" width="360px" />
                                    <UnderlineTextBox icon={faKey} hint="Password" type="password" width="360px" />
                                    <div className={clsx('flex flex-row gap-[10px] items-center text-white mt-[10px] ml-auto')}>
                                        <input className={clsx('cursor-pointer aspect-square w-[16px]')} type="checkbox" id="check" />
                                        <label className={clsx('cursor-pointer')} htmlFor="check">Show password</label>
                                    </div>
                                    <div className={
                                        clsx('h-[50px] w-[360px] rounded-[5px] bg-(--medium-blue) text-white text-[20px] font-semibold  flex justify-center items-center',
                                            'hover-btn'
                                        )}>
                                        Log in
                                    </div>
                                    <span className={clsx('text-white ml-auto mr-auto')}>
                                        Forgot your password ?   
                                        <Link className={clsx('text-amber-500 ml-[5px]')} to='/auth/password-recover'>Recover here !</Link>
                                    </span>

                                </div>
                            </div>
                            <div className={clsx('flex-1 h-full ')}>
                                <div className={
                                    clsx('bg-(--primary-blue-card-bg) h-full w-3/4 ml-auto cursor-pointer',
                                        'oauth-hover-btn'
                                    )}>
                                    <div className={clsx('flex flex-col h-full w-full gap-[20px] justify-center items-center')}>
                                        <img className={clsx('aspect-square w-[50px]')} src={google} />
                                        <label className={clsx('text-[rgba(255,255,255,0.7)] font-semibold text-[18px] cursor-pointer')}>Continue with Google</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={clsx('flex flex-col w-1/2 relative')}>
                            <label className={clsx('text-(--orange-red) text-[25px] font-semibold ml-[50px] mt-[20px]')}>
                                Create new account
                            </label>
                            <div className={clsx('flex flex-row gap-[60px]')}>
                                <div className={clsx('flex flex-col gap-[20px] ml-[50px] pt-[30px]')}>
                                    <UnderlineTextBox type="email" hint="Email" icon={faEnvelope} width="350px" />
                                    <UnderlineTextBox type="text" hint="Username" icon={faUser} width="350px" />
                                    <UnderlineTextBox type="password" hint="Password" icon={faKey} width="350px" />
                                    <UnderlineTextBox type="password" hint="Confirm" icon={faCheck} width="350px" />
                                    <div className={clsx('flex flex-row gap-[10px] items-center text-white mt-[10px] ml-auto')}>
                                        <input className={clsx('cursor-pointer aspect-square w-[16px]')} type="checkbox" id="check" />
                                        <label className={clsx('cursor-pointer')} htmlFor="check">Show password</label>
                                    </div>
                                </div>
                                <div className={clsx('flex flex-col pt-[30px] gap-[20px]')}>
                                    <UnderlineTextBox type="text" hint="First name" width="240px" />
                                    <UnderlineTextBox type="text" hint="Last name" width="240px" />
                                </div>
                            </div>
                            <div className={
                                clsx('absolute bottom-0 right-0 mb-[20px] mr-[20px] h-[50px] w-[280px] flex justify-center items-center bg-(--deep-pink) rounded-[10px] text-white font-semibold cursor-pointer',
                                    'hover-btn'
                                )}>
                                Create new account
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage