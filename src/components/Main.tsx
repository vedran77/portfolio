import React from "react";
import axios from "axios";
import { AiFillGithub, AiFillMail } from "react-icons/ai";
import { BsStackOverflow } from "react-icons/bs";

import Repo from "./Repo";
import "./style/Main.css"


export type GIT_REPO = {
    name: string;
    desc: string;
    stargazersCount: number;
    watchersCount: number;
    lang: string;
    issues: number;
    url: string;
}

class Main extends React.Component {
    private GITHUB_API: string = "https://api.github.com";
    private USERNAME: string = "vedran77";

    public state = {
        repos: []
    };

    public componentDidMount() {
        this.getRepos();
    }

    public render(): JSX.Element {
      return (
        <>
            <div className="aboutme">
                <img src='https://raw.githubusercontent.com/vedran77/portfolio/main/public/vedran.png' alt="logo"/>
                <div className="text">
                    <h3>Hello I’m <span>Vedran</span>.</h3>
                    <p>I currently live in Banja Luka, 
                        a city in Bosnia and Herzegovina. 
                        I am 18 years old and I  create 
                        web and
                        desktop applications. 
                        Ever  since I was a kid I have had 
                        love for computers and the way they
                        work.
                        I'm constantly working on 
                        myself and trying to grasp as much
                        new knowledge as I can.</p>
                </div>
                <div className="social-media">
                    <a href="mailto://vedran77@icloud.com" target="_blank" rel="noreferrer"><AiFillMail/></a>
                    <a href="https://github.com/vedran77" target="_blank" rel="noreferrer"><AiFillGithub/></a>
                    <a href="https://stackoverflow.com/users/17754783/vedran77" target="_blank" rel="noreferrer"><BsStackOverflow/></a>
                </div>
            </div>
            <div className="projects">
                {this.state.repos.map((repo: GIT_REPO, index: number) => {
                    return(
                        <Repo 
                            name={repo.name} 
                            desc={repo.desc}
                            stargazersCount={repo.stargazersCount}
                            watchersCount={repo.watchersCount}
                            lang={repo.lang}
                            issues={repo.issues}
                            url={repo.url}/>
                    )
                })}
            </div>
        </>
      )  
    }

    private getRepos(): void {
        axios.get(`${this.GITHUB_API}/users/${this.USERNAME}/repos`).then((response) => {
            let repos: GIT_REPO[] = [];

            for (const repo of response.data) {
                repos.push({
                    name: repo.name,
                    desc: repo.description,
                    stargazersCount: repo.stargazers_count,
                    watchersCount: repo.watchers_count,
                    lang: repo.language,
                    issues: repo.open_issues_count,
                    url: repo.html_url
                });
            }

            this.setState((state, props) => ({
                repos
            }));
        });
    }
}

export default Main