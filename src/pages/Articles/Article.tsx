import {Frame} from '../_frame';
import Markdown from 'react-markdown'
import './articles.css'
import {useEffect, useState} from 'react';
import remarkGfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter/src/light';
import {dark} from 'react-syntax-highlighter/src/styles/hljs';


export const Article = () => {

    const [content, setContent] = useState("")
    const file = window.location.pathname.replace("/articles/", "")

    useEffect(() => {
        import(`./articles/${file}.md`).then(res => {
            fetch(res.default)
                .then(response => response.text())
                .then(text => setContent(text))
        })

    }, [])

    if (!content) {
        return null;
    }

    return (
        <Frame>
            <article>
                <div style={{paddingBottom: 16, borderBottom: "2px solid #FFF"}}>
                    This page is a work in progress - both the content and building this page from a Markdown file on
                    page load.
                </div>
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code(props) {
                            const {children, className, node, ...rest} = props
                            // const match = /language-(\w+)/.exec(className || '')
                            return (
                                <SyntaxHighlighter
                                    {...rest}
                                    PreTag="div"
                                    children={String(children).replace(/\n$/, '')}
                                    language={"JavaScript"}
                                    style={dark}
                                />
                                // ) : (
                                //     <code {...rest} className={className}>
                                //         {children}
                                //     </code>
                            )
                        }
                    }}
                >
                    {content}
                </Markdown>
            </article>
        </Frame>
    );
};