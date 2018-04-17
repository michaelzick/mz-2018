import React, { Component } from 'react';
import axiosConfig from '../axiosConfig';
import MainHOC from '../hoc/MainHOC';
import Nav from '../components/Nav';
import NameForm from '../components/NameForm';
import { Main } from '../global.js';

class Home extends Component {
    state = {
        workData: null
    };

    componentDidMount() {
        axiosConfig.get('/all.json')
            .then(resp => {
                const sortedWorkData = resp.data.work.sort((a, b) => {
                    return a.order_num - b.order_num;
                });

                this.setState({
                    aboutData: resp.data.about,
                    artData: resp.data.art,
                    picsData: resp.data.pics,
                    skillsData: resp.data.skills,
                    workData: sortedWorkData
                });

                Main.init();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render () {
        const works = !this.state.workData ?
            null : <MainHOC header='Corporate Entities' dataFeed={this.state.workData} />;
        const art = !this.state.artData ?
            null : <MainHOC header='Cultural Artifacts' dataFeed={this.state.artData} />;
        const pics = !this.state.picsData ?
            null : <MainHOC header='Personnel' dataFeed={this.state.picsData} />;
        const about = !this.state.aboutData ?
            null : <MainHOC header={'Captain\'s Log'} dataFeed={this.state.aboutData} />;
        const skills = !this.state.skillsData ?
            null : <MainHOC header='Qualifications' dataFeed={this.state.skillsData} />;

        return (
            <div className="content">
                <div className="row-fluid">
                    <div className="span12">

                        <Nav />

                        <h1 id="my-name">michael zick</h1>

                        <div id="subclass">
                            <p>ui engineer : class a : v 3.1.0</p>
                            <p>this site is built on nodejs // express // ejs // react // mongodb</p>
                        </div>

                        <div id="socialwell">
                            <span><a href="http://www.linkedin.com/in/michaelzick" target="_blank">linkedin</a></span>
                            <span>&nbsp;:&nbsp;</span>
                            <span><a href="http://zickonezero.tumblr.com/" target="_blank">blog</a></span>
                            <span>&nbsp;:&nbsp;</span>
                            <span><a href="https://github.com/zickonezero?tab=repositories" target="_blank">github</a></span>
                        </div>

                        <div id="ascensorBuilding">
                            <section>
                                <div id="loader"></div>
                                <h1 id="intro" className="typeText"></h1>
                                <br></br>
                                <NameForm />
                            </section>

                            <section className="add-border">
                                <h1 id="section2-title">Corporate Entities</h1>
                                <div id="work" className="row-fluid">
                                    {works}
                                </div>
                            </section>

                            <section className="add-border large-img">
                                <h1 id="section3-title">Cultural Artifacts</h1>
                                <div id="art" className="row-fluid">
                                    {art}
                                </div>
                            </section>

                            <section className="add-border large-img">
                                <h1 id="section4-title">Personnel</h1>
                                <div id="pics" className="row-fluid">
                                    {pics}
                                </div>
                            </section>

                            <section>
                                {about}
                                {skills}
                            </section>

                            <div id="proj_img_links">
                                <div id="proj-imgs-1"></div>
                                <div id="proj-imgs-2"></div>
                                <div id="proj-imgs-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Home;
