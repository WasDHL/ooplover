import React from 'react';

export default class SelectComponent extends React.Component {
    construcor (props) {
        super(props);

        this.state = {
            selectedIdx: props.selectedIdx !== undefined && props.selectedIdx !== null ? props.selectedIdx : null
        }

        this.children = this.props.children || [];
    }

    onChange () {

    }

    render () {
  //       React.Children && React.Children.map && React.Children.map(children, child => {
  //   if(child.type == CheckableList.Header) {
  //     header = child;
  //   } else if (child.type == CheckableList.Item) {
  //     items.push(child);
  //   }
  // });
        var renderChildren = [];
        React.Children && React.Children.map && React.Children.map(this.children, child => {
            if (child.type == Option) {
                // React.cloneElement(items[idx], { checked: true })
                renderChildren.push(React.cloneElement(child, { onParentSelect: () => this.onChange() }));
            } else {
                renderChildren.push(child);
            }
        });

        return (
            <div></div>
        );
    }



}

export class Option extends React.Component {
    construcor (props) {

    }
}
