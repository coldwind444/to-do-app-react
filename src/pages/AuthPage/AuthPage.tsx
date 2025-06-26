import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import './AuthPage.css'
import UnderlineTextBox from "../../components/UnderlineTextBox/UnderlineTextBox"
import { faCheck, faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import google from '../../assets/google.png'
import { useAuth } from "../../provider/AuthContext"
import { userRegister } from "../../apis/user"

const AuthPage = () => {
    const { login, jwtLoading } = useAuth()
    const loginFormRef = useRef<HTMLFormElement>(null)
    const registerFormRef = useRef<HTMLFormElement>(null)

    const [tab, setTab] = useState(1)
    const [registerLoading, setRegisterLoading] = useState(false)
    const [validData, setValidData] = useState(false)

    const [showLgPassword, setShowLgPassword] = useState(false)
    const [showCrPassword, setShowCrPassword] = useState(false)

    const [usernameLg, setUsernameLg] = useState('')
    const [passwordLg, setPasswordLg] = useState('')

    const [usernameCr, setUsernameCr] = useState('')
    const [passwordCr, setPasswordCr] = useState('')
    const [confirm, setConfirm] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState(false)

    const handleLogin = () => {
        login({ username: usernameLg, password: passwordLg })
        loginFormRef.current?.reset()
    }

    const handleRegister = async () => {
        if (confirm !== passwordCr) return

        try {
            setRegisterLoading(true)
            const res = await userRegister({
                username: usernameCr,
                password: passwordCr,
                fname: fname,
                lname: lname,
                email: email,
                gender: gender
            })
            if (res.status === 200) {
                registerFormRef.current?.reset()
                setTab(1)
            }
        } catch (e) {
            console.error('Register failed.', e)
        } finally {
            setRegisterLoading(false)
        }
    }

    useEffect(() => {

        const registerValidate = () => {
            return usernameCr.length >= 8 && passwordCr.length >= 8 && fname.length !== 0 && lname.length !== 0
                && email.length !== 0 && passwordCr === confirm
        }

        setValidData(registerValidate())

    }, [usernameCr, passwordCr, confirm, fname, lname, email])


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
                                <form ref={loginFormRef} className={clsx('flex flex-col ml-[50px] mt-[50px] gap-[15px]')}>
                                    <UnderlineTextBox icon={faUser} hint="Username" type="text" width="360px"
                                        onChange={(e) => setUsernameLg(e.target.value)} />
                                    <UnderlineTextBox icon={faKey} hint="Password"
                                        type={showLgPassword ? 'text' : "password"} width="360px"
                                        onChange={(e) => setPasswordLg(e.target.value)} />
                                    <div className={clsx('flex flex-row gap-[10px] items-center text-white mt-[10px] ml-auto')}>
                                        <input className={clsx('cursor-pointer aspect-square w-[16px]')}
                                            type="checkbox" id="check1" onChange={(e) => setShowLgPassword(e.target.checked)} />
                                        <label className={clsx('cursor-pointer')} htmlFor="check1">Show password</label>
                                    </div>
                                    <div className={
                                        clsx('h-[50px] w-[360px] rounded-[5px] bg-(--medium-blue) text-white text-[20px] font-semibold  flex justify-center items-center',
                                            'hover-btn', { 'blue-disabled': passwordLg.length < 8 || usernameLg.length === 0 }
                                        )} onClick={() => handleLogin()}>
                                        Log in
                                    </div>
                                    <span className={clsx('text-white ml-auto mr-auto')}>
                                        Forgot your password ?
                                        <Link className={clsx('text-amber-500 ml-[5px] hover:underline')} to='/password-recover'>Recover here !</Link>
                                    </span>
                                    <span className={clsx('loader h-[30px] w-[30px] ml-auto mr-auto', { 'invisible': !jwtLoading })}></span>
                                </form>
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
                            <form ref={registerFormRef} className={clsx('flex flex-row gap-[60px]')}>
                                <div className={clsx('flex flex-col gap-[20px] ml-[50px] pt-[30px]')}>
                                    <UnderlineTextBox type="email" hint="Email" icon={faEnvelope} width="350px"
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <UnderlineTextBox type="text" hint="Username" icon={faUser} width="350px"
                                        onChange={(e) => setUsernameCr(e.target.value)} />
                                    <UnderlineTextBox hint="Password" icon={faKey} width="350px"
                                        type={showCrPassword ? 'text' : "password"}
                                        onChange={(e) => setPasswordCr(e.target.value)} />
                                    <UnderlineTextBox hint="Confirm" icon={faCheck} width="350px"
                                        type={showCrPassword ? 'text' : "password"}
                                        onChange={(e) => setConfirm(e.target.value)} />
                                    <div className={clsx('flex flex-row gap-[10px] items-center text-white mt-[10px] ml-auto')}>
                                        <input className={clsx('cursor-pointer aspect-square w-[16px]')}
                                            type="checkbox" id="check2"
                                            onChange={(e) => setShowCrPassword(e.target.checked)} />
                                        <label className={clsx('cursor-pointer')} htmlFor="check2">Show password</label>
                                    </div>
                                </div>
                                <div className={clsx('flex flex-col pt-[30px] gap-[20px]')}>
                                    <UnderlineTextBox type="text" hint="First name" width="240px"
                                        onChange={(e) => setFname(e.target.value)} />
                                    <UnderlineTextBox type="text" hint="Last name" width="240px"
                                        onChange={(e) => setLname(e.target.value)} />
                                    <div className="flex flex-row gap-[40px] mt-[30px] ml-[15px]">
                                        <div className={clsx('flex flex-row gap-[10px] items-center')}>
                                            <input type="radio" name="gender" id="option1" className='cursor-pointer'
                                                onChange={(e) => setGender(!e.target.checked)} checked={!gender}/>
                                            <label className="text-white cursor-pointer" htmlFor="option1">Female</label>
                                        </div>
                                        <div className={clsx('flex flex-row gap-[10px] items-center')}>
                                            <input type="radio" name="gender" id="option2" className='cursor-pointer'
                                                onChange={(e) => setGender(e.target.checked)} checked={gender}/>
                                            <label className="text-white cursor-pointer" htmlFor="option2">Male</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className={
                                clsx('absolute bottom-0 right-0 mb-[20px] mr-[20px] h-[50px] w-[280px] flex justify-center items-center',
                                    'bg-(--deep-pink) rounded-[10px] text-white font-semibold cursor-pointer hover-btn',
                                    { 'pink-disabled': !validData }
                                )} onClick={() => handleRegister()}>
                                Create new account
                            </div>
                            <span className={clsx('loader h-[30px] w-[30px] ml-auto mr-[150px] -translate-y-[60px]', { 'invisible': !registerLoading })}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage