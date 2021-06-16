import "./App.css";
import { Layout } from "antd";
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
      <Footer style={{textAlign: "center", backgroundColor: '##fafafa'}}>Developed by <a href="https://github.com/namangupta1399" target="_blank" rel="noreferrer">Naman Gupta</a></Footer>
    </Layout>
  );
}

export default App;
