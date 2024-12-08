import {Frame} from '../_frame';
import Markdown from 'react-markdown'
import './articles.css'
import {useEffect, useState} from 'react';
import remarkGfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter/src/light';
import {dark} from 'react-syntax-highlighter/src/styles/hljs';
import {CollapsableContent} from './_common';


export const Article = () => {

    const [content, setContent] = useState("")
    const file = window.location.pathname.replace("/articles/", "")

    useEffect(() => {
        import(`./articles/${file}.md`).then(res => {
            fetch(res.default)
                .then(response => response.text())
                .then(text => setContent(text))
        })

    }, [file])

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
                        code: CodeBlockComponent,
                        blockquote: Collapsable
                    }}
                >
                    {content}
                </Markdown>
            </article>
        </Frame>
    );
};

const CodeBlockComponent = (props) => {
    const {children, className, node, ...rest} = props

    return (
        <SyntaxHighlighter
            {...rest}
            PreTag="div"
            children={String(children).replace(/\n$/, '')}
            language={"JavaScript"}
            style={dark}
        />
    )
}

const Collapsable = (props) => {
    const content = props.children.filter(child => child != "\n")
    console.log(content)
    const titleNode = content[0]
    const contentNodes = content.slice(1, content.length)

    return <CollapsableContent title={titleNode.props.children}>{contentNodes}</CollapsableContent>

}