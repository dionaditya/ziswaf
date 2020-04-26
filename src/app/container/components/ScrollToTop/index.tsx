import React, { useEffect, Fragment } from "react";
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IProps extends RouteComponentProps<any> {
  history: any,
  children: any
}

function ScrollToTop(props: IProps) {

  const {history, children} = props
  
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);
