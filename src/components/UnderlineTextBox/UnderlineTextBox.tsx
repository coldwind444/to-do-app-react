import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './UnderlineTextBox.css'
import clsx from "clsx";

type UnderlineTextBoxProps = {
    icon?: IconDefinition;
    type?: string;
    hint?: string;
    width?: string;
    height?: string;
    hoverbg?: string;
    lineColor?: string;
    fontSize?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const UnderlineTextBox = (
    { icon, type = "text", hint = "", width = '400px', height = '60px', 
    hoverbg = 'var(--dark-blue-bg)', lineColor = 'var(--medium-blue)', fontSize = 'text-[20px]', onChange }: UnderlineTextBoxProps) => {
    return (
        <div className={
            clsx(`flex flex-row items-center gap-[20px]`,
                'underlined-textbox'
        )} style={{ width , height, '--hover-bg': hoverbg, '--line-color': lineColor } as React.CSSProperties}>
            <div>
                {icon && <FontAwesomeIcon className={clsx(`pl-[20px] ${fontSize}`)} icon={icon}/>}
            </div>
            <div className={clsx(`text-white ${fontSize} w-4/5`)}>
                <input className={clsx('w-full h-[35px] border-none outline-none')} 
                        type={type} placeholder={hint} onChange={onChange}/>
            </div>
            <div className={clsx('absolute bottom-[0] bg-[rgba(255,255,255,0.7)] h-[1px] w-full')}></div>
        </div>
    );
};

export default UnderlineTextBox;
