import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import './style.css';
import { NavLink } from 'react-router-dom';

const dataSource = [
  {
    id: 1,
    type: 'Folder 1',
    subfolder: [
      {id: 2, name: 'Subfolder 1A'},
      {id: 3, name: 'Subfolder 1B', subfolder: [{
        id: 4, name: 'Subfolder 1B-1'
        }]
      },
    ],
  },
  {
    type: 'Folder 2',
    subfolder: [
      {name: 'Subfolder 2A'},
      {name: 'Subfolder 2B'},
      {name: 'Subfolder 2C'},
    ],
  },
  {
    type: 'Folder 3'
  }
];

class Folders extends React.Component {
    constructor() {
        super();  

    this.state = {
        dataSource: [],
        breadcrumbLinks: [],
        mainOption:false, 
        firstOption: false, 
        secondOption: false, 
        thirdOption: false
      };
    }
  
    mainOption = () => {
      this.setState({ mainOption: !this.state.mainOption});
    }

    firstOption = () => {
      this.setState({ firstOption: !this.state.firstOption});
    }

    secondOption = () => {
      this.setState({secondOption: !this.state.secondOption});
    }

    thirdOption = () => {
      this.setState({thirdOption: !this.state.thirdOption});
    }

    onHandleChange = (e) => {
      this.setState({
        mainOption: e.target.mainOption,
        firstOption: e.target.firstOption,
        secondOption: e.target.secondOption,
        thirdOption: e.target.thirdOption
      });
    }

    getParents(el, parentSelect) {
      let parents = [];
      let node = el.parentNode;

      while (node !== parentSelect) {
        const curParent = node;
        if (curParent.tagName === "DIV") {
          parents.push(curParent);
        }
        node = curParent.parentNode;
      }
      return parents;
    }

    itemClick = (e) => {
      const allParents = this.getParents(
        e.target,
        document.getElementById("parent")
      );

      let allChildren = [];
      allParents.forEach(el => {
        const ch = Array.from(el.children);
        ch.forEach(child => {
          if (child.tagName === "A") {
            allChildren.push(child);
          }
        });
      });
      this.setState({
        breadcrumbLinks: allChildren.reverse()
      });
    };

    onBreadcrumbItemClick = (i) => {
      this.setState(({breadcrumbLinks}) => {
        return {
          breadcrumbLinks: breadcrumbLinks.slice(0, i + 1)
        };
      });
    };

render() {
  
  const {breadcrumbLinks} = this.state;
  return (
    <div>

      {/* Breadcrumb test */}
      
      <div className="breadcrumb">
        <NavLink exact to="/">
          Documents
        </NavLink>
        {breadcrumbLinks.map((el, i) => {
          return (
            <NavLink key={i} exact to={el.pathname}>
              <span onClick={() => this.onBreadcrumbItemClick(i)}>
                {el.innerText}
              </span>
            </NavLink>
          );
        })}
      </div>
      
      {/* Documents */}
      <div id="parent">
      <div className="main-dropdown">
        <div onClick={this.mainOption}>
          <div className="documents-dropdown">
            <p>Documents</p>
            <span>{this.state.mainOption ? <ExpandLess /> : <ExpandMore />}</span>
        </div>
      </div>
      <Collapse in={this.state.mainOption} timeout="auto" unmountOnExit>

      {/* First folder */}
      <NavLink exact to="/folder1">
      <div onClick={this.itemClick}>
      <div onClick={this.firstOption}>
        <div className="folder-dropdown">
          {dataSource.slice(0, 1).map((document)=>
          <p key={document.id}>{document.type}</p>
          )}
          <span>{this.state.firstOption ? <ExpandLess /> : <ExpandMore />}</span>
        </div>
      </div>
      </div>
      </NavLink> 

    <Collapse in={this.state.firstOption} timeout="auto" unmountOnExit>
      <NavLink exact to="/subfolder1A">
      <div onClick={this.itemClick}>
      <div className="subfolder-dropdown">
        {dataSource.slice(0, 1).map((document)=>
          document.subfolder.slice(0, 1).map((subfolder)=>
          <p>{subfolder.name}</p>
          )
        )}
      </div>
      </div>
      </NavLink>

      <NavLink exact to="/subfolder1B">
      <div onClick={this.itemClick}>
      <div onClick={this.secondOption}>
        <div className="subfolder-dropdown">
          {dataSource.slice(0, 1).map((document)=>
            document.subfolder.slice(1, 2).map((subfolder)=>
            <p>{subfolder.name}</p>
            )
          )}
          <span>{this.state.secondOption ? <ExpandLess /> : <ExpandMore />}</span>
        </div>
      </div>
      </div>
      </NavLink>
      
      <Collapse in={this.state.secondOption} timeout="auto" unmountOnExit>
        
      <NavLink exact to="/subfolder1B-1">
      <div onClick={this.itemClick}>
      <div className="sub-subfolder-dropdown">
          {dataSource.slice(0, 1).map((document)=>
            <p key={document.id}>{document.subfolder.slice(1, 2).map((subfolder)=>
              <p key={subfolder.id}>{subfolder.subfolder.map((subsubfolder)=>
                <p key={subsubfolder.id}>{subsubfolder.name}</p>
              )}</p>
            )}</p>
          )}
      </div>
      </div>
      </NavLink>
      </Collapse>
    </Collapse>

      {/* Second folder */}

      <NavLink exact to="/folder2">
      <div onClick={this.itemClick}>
      <div onClick={this.thirdOption}>
        <div className="folder-dropdown">
          {dataSource.slice(1, 2).map((document)=>
            <p key={document.id}>{document.type}</p>
          )}
        <span>{this.state.thirdOption ? <ExpandLess /> : <ExpandMore />}</span>
        </div>
      </div>
      </div>
      </NavLink>

      <Collapse in={this.state.thirdOption} timeout="auto" unmountOnExit>

      <NavLink exact to="/subfolder2A">
      <div onClick={this.itemClick}>
      <div className="subfolder-dropdown">
        {dataSource.slice(1, 2).map((document)=>
          document.subfolder.slice(0, 1).map((subfolder)=>
            <p>{subfolder.name}</p>
          )
        )}
      </div>
      </div>
      </NavLink>

      <NavLink exact to="/subfolder2B">
      <div onClick={this.itemClick}>
      <div className="subfolder-dropdown">
        {dataSource.slice(1, 2).map((document)=>
          document.subfolder.slice(1, 2).map((subfolder)=>
            <p>{subfolder.name}</p>
          )
        )}
      </div>
      </div>
      </NavLink>

      <NavLink exact to="/subfolder2C">
      <div onClick={this.itemClick}>
      <div className="subfolder-dropdown">
        {dataSource.slice(1, 2).map((document)=>
          document.subfolder.slice(2, 3).map((subfolder)=>
            <p>{subfolder.name}</p>
          )
        )}
      </div>
      </div>
      </NavLink>
      </Collapse>

      {/* Third folder */}

      <NavLink exact to="/folder3">
      <div onClick={this.itemClick}>
      <div className="folder-dropdown">
        {dataSource.slice(2, 3).map((document)=>
          <p key={document.id}>{document.type}</p>
        )}
      </div>
      </div>
      </NavLink>
      </Collapse>
      </div>
    </div>
    </div>
  );
};
}

export default Folders;
