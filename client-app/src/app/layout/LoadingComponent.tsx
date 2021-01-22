import { observer } from 'mobx-react-lite'
import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface IProps {
    inverted?: boolean;
    content?: string;
}

const LoadingComponent = ({ inverted = true, content }: IProps): JSX.Element => {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}

export default observer(LoadingComponent)
