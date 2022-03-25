const RoadmapItem = ({text}) => {
    return (
        <div className="item">
            <img src="/assets/roadmap-arrow.svg" />
            <div className="text">{text}</div>
        </div>
    )
}

export default RoadmapItem
