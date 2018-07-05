import React from "react"
import ReactDOM from "react-dom"
import { Button, Dropdown, Grid, List, Menu, Segment } from "semantic-ui-react"
import styled from "styled-components";

import "semantic-ui-css/semantic.min.css"
import MenuV from "./components/Menu";
import searchApi from "./share/SearchApi"

type State = {
  projectName: string
  projectPath: string
  projectContent: string
  dropdownOption: any[]

}
class App extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectPath: "",
      projectContent: "",
      dropdownOption: [],

    }
  }

  public componentDidMount() {
    searchApi.getProjectNames().then(res => {
      // tslint:disable-next-line:no-console
      console.log("Project Name" + res.data)
      let options = [];
      res.data.forEach(x => {
        // เอาdata push เข้าไปใน option
        options.push({ value: x, text: x });
      });
      this.setState({ dropdownOption: options })
      // ได้ค่าโปรเจคทั้งหมดมาเก็บในoption
    })
  }
  private GetFileNamez(value: string) {
    let path = "/tmp/ProjectA/AppSettings.json";
    let strArr: string[] = path.split("/");
    return strArr[strArr.length - 1]
  }
      // _____________ดึงชื่อไฟล์Project_________________|
  private initProjectSettings(value: string) {
    searchApi.getProjectSettings(value).then(response => {
      // tslint:disable-next-line:no-console
      console.log("path" + response.data)
      let pathProject = [];
      response.data.forEach(x => {
        // เอาค่าpathเก็บไปไว้ในแอรแรย์ก่อย
        pathProject.push(x);
      });
      // ____________ดึงชื่อไฟล์ตั้งค่าของproject____________|
      // เก็บไฟล์ไว้ในarrayชื่อไฟล์
      let fileName = [];
      pathProject.forEach(x => {
        // เอาค่าpathเก็บไปไว้ในแอรแรย์ก่อย
        let arrayFile = [];
        arrayFile = x.split("/");
        let arrayName = [];
        arrayName = arrayFile[arrayFile.length - 1]
        fileName.push(arrayName);
      });
      // tslint:disable-next-line:no-console
      console.log(fileName)
      // ฟังก์ชั่นสำหรับการนำค่าในไฟลsetting__________________|
      // this.initSettingContent(response.data);
    })
  }
  // ยังไม่ใช้
  private initSettingContent(value: string) {
    searchApi.getSettingContent(value).then(response => {
      // tslint:disable-next-line:no-console
      console.log(response.data.content)
      this.setState({ projectContent: response.data.content })
      this.setState({ projectPath: response.data.path })
    })
  }

  //
  //
  // __________ทดสอบแสดงชื่อโปรเจค__________|
  private Showproject() {
    return this.state.projectName
  }
  private ShowPath() {
    return this.state.projectPath
  }
  private ShowContent() {
    return this.state.projectContent
  }
  // .
  // ______________ลูปสร้างlist______________|
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // @@@@@@@@@@@@@ โค้ดตรงนี้ @@@@@@@@@@@@@@@
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // ______________________________________|
  // .
  public setValue(e, data) {
    this.setState({ projectName: data.value })
    this.initProjectSettings(data.value)
  }
  public render() {
    const { dropdownOption } = this.state
    const Wrapper = styled.section`
  padding: 4em;
  `;
    const DropdownProjectName = () => (
      // tslint:disable-next-line:max-line-length
      <Dropdown placeholder="Select Project" fluid selection options={dropdownOption}
        onChange={this.setValue.bind(this)} value={this.state.projectName} />
    )
    return (
      <Wrapper>
        <Grid>
          <Grid.Column width={10}>
            <h1>Config Editer</h1>
            <Segment>
              projectname[now]  : {this.Showproject()}
              <br />
              projectpath[now]  : {this.ShowPath()}
              <br />
              projectcontent[now]  : {this.ShowContent()}
            </Segment>
          </Grid.Column>
          <Grid.Row>
            <Grid.Column width={15}>
              <Segment>
                <MenuV />
                <DropdownProjectName />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    );
  }
}

let root = document.getElementById("root")
ReactDOM.render(<App />, root)