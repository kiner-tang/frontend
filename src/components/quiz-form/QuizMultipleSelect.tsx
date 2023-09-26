import {useController, UseControllerProps} from "react-hook-form";
import {IQuiz} from "@site/src/typings/quiz";
import ReactMarkdown from "react-markdown";
import Image from "@site/src/components/docs/Image";
import {cn} from "@site/src/utils/class-utils";
import {IQuizFormValues} from "@site/src/components/quiz-form/Preview";
import React from "react";

const QuizMultipleSelect = ({quiz,...props}: UseControllerProps<IQuizFormValues> & {quiz:IQuiz}) => {
    const { field } = useController(props)
    const {value=[],onChange}=field
    return (<div>
        <div className='py-[20px] text-[16px] font-bold'>
            <ReactMarkdown children={quiz.title}/>
        </div>
        <div className='my-[20px]'>
            {quiz.content.extend.length && quiz.content.extend.map((md,index)=> <ReactMarkdown components={{img:Image}} key={index} children={md.raw} />)}
        </div>

        <div>
            {quiz.content.options.map((answer) => (<div
                key={answer.value}
                onClick={()=>{
                    if(!value.includes(answer.value)){

                        onChange([...(value as string[]),answer.value])
                    }else {
                        onChange((value as string[]).filter(v=>v!==answer.value))
                    }
                }}
                className={cn('px-[10px] py-[20px] border border-solid border-black-500 rounded-[4px] mb-[20px] cursor-pointer', {'border-green-500 text-green-500': value.includes(answer.value)})}>
                <ReactMarkdown>
                    {`${answer.value}. ${answer.label}`}
                </ReactMarkdown>
            </div>))}
        </div>
    </div>)
}

export default QuizMultipleSelect