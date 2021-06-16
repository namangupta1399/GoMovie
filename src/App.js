import "./App.css";
import { Layout, Menu } from "antd";
import MainContent from "./components/MainContent";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <div className="logo">GoMovie</div>
      </Header>
      <Content>
        <MainContent />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
