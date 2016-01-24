import React, { Component, PropTypes } from 'react';
import { RouterContext } from 'react-router/lib'

function hydrate(props) {
  if (typeof APP_PROPS !== 'undefined')
    return {
      propsArray: APP_PROPS,
      componentsArray: props.components.filter(component => component.loadProps)
    }
  else
    return null
}

function createElement(Component, props) {
  if (Component.loadProps)
    return <PropsContainer Component={Component} routerProps={props}/>
  else
    return <Component {...props}/>
}

function lookupPropsForComponent(Component, propsAndComponents) {
  const { componentsArray, propsArray } = propsAndComponents
  var index = componentsArray.indexOf(Component)
  return propsArray[index]
}

class PropsContainer extends React.Component {

  static propTypes = {
    Component: PropTypes.func.isRequired,
    routerProps: PropTypes.object.isRequired
  };

  static contextTypes = {
    asyncProps: PropTypes.object.isRequired
  };

  render() {
    const { Component, routerProps, ...props } = this.props
    const { propsAndComponents } = this.context.asyncProps
    const asyncProps = lookupPropsForComponent(Component, propsAndComponents)
    return (
      <Component
        {...props}
        {...routerProps}
        {...asyncProps} />
    )
  }

}

export default class AppContext extends Component {

  static childContextTypes = {
    didMount: PropTypes.bool,
    asyncProps: PropTypes.object
  };

  static propTypes = {
    components: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    // server rendering
    propsArray: PropTypes.array,
    componentsArray: PropTypes.array
  };

  constructor(props, context) {
    super(props, context)
    const { propsArray, componentsArray } = this.props
    const isServerRender = propsArray && componentsArray
    this.state = {
      didMount: false,
      propsAndComponents: isServerRender ?
        { propsArray, componentsArray } :
        hydrate(props)
    }
  }

  componentDidMount() {
    this.setState({ didMount: true });
  }

  getChildContext() {
    const { didMount, propsAndComponents } = this.state
    return {
      didMount,
      asyncProps: { propsAndComponents }
    };
  }

  render() {
    return <RouterContext {...this.props} createElement={createElement}/>
  }
}
