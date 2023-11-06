import { useEffect, useRef } from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => {
    const windowWidth = useRef(window.innerWidth)
    const arr = []

    useEffect(() => {
        windowWidth.current = window.innerWidth
        console.log(windowWidth.current)
    }, [])

    for (let i = 0; i < 8; i++) {
        arr.push(windowWidth.current > 576 ? <div className="skeleton" key={i}>
                    <ContentLoader 
                        speed={2}
                        width={210}
                        height={280}
                        viewBox="0 0 210 280"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                        {...props}
                    >
                        <rect x="30" y="153" rx="3" ry="3" width="150" height="15" /> 
                        <rect x="30" y="172" rx="3" ry="3" width="93" height="15" /> 
                        <rect x="30" y="36" rx="10" ry="10" width="150" height="91" /> 
                        <rect x="30" y="219" rx="8" ry="8" width="80" height="24" /> 
                        <rect x="148" y="211" rx="8" ry="8" width="32" height="32" />
                    </ContentLoader>
                </div> : <div className="skeleton">
                <ContentLoader 
                    speed={2}
                    width={286}
                    height={122}
                    viewBox="0 0 286 122"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    {...props}
                >
                    <rect x="122" y="15" rx="5" ry="5" width="144" height="15" /> 
                    <rect x="15" y="15" rx="15" ry="15" width="92" height="92" /> 
                    <rect x="122" y="55" rx="5" ry="5" width="100" height="25" /> 
                    <rect x="122" y="35" rx="5" ry="5" width="60" height="15" />
                </ContentLoader>
                </div>)
    }

    return arr
}

export default Skeleton