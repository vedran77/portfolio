import React from "react";
import { GoIssueClosed } from "react-icons/go";
import { AiFillEye, AiFillStar } from "react-icons/ai";


import { GIT_REPO } from "./Main";
import "./style/Repo.css";

class Repo extends React.Component<GIT_REPO> {
    public render(): JSX.Element {
        return(
            <div className="repo">
                <a href={this.props.url} target="_blank">
                    <p>{this.props.lang}</p>
                    <h3>{this.props.name}</h3>
                    <h4>{this.props.desc}</h4>
                    <div className="repo-info">
                        <div className="repo-number">
                            <GoIssueClosed/>
                            <h1>{this.props.issues}</h1>
                        </div>
                        <div className="repo-number">
                            <AiFillStar/>
                            <h1>{this.props.stargazersCount}</h1>
                        </div>
                        <div className="repo-number">
                            <AiFillEye/>
                            <h1>{this.props.watchersCount}</h1>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default Repo;