import React, { FC, useState } from 'react';
import './App.css';


 interface ParamProps { 
    id: number;
    name: string;
    type: 'string';
 }
  interface ParamValue { 
     paramId: number;
     value: string;
 }
  interface ModelProps { 
     paramValues: ParamValue[];
 }
  interface Props { 
     params: ParamProps[];
     model: ModelProps;
 }
 

const Parameters: FC<ParamProps> = ({...props}) => {
  
  return (
    <div>
      <div key={props.id}>{props.name} </div>
    </div>
  )
}


const Model: FC<ParamValue & React.InputHTMLAttributes<HTMLInputElement>> = ({paramId, value}) => {
  const [model, setModel] = useState<string>(value)
  const modelHandler = (e: React.ChangeEvent<HTMLInputElement>, fx: (value: string)=> void) => {
    const newValue = e.currentTarget.value;
    fx(newValue)
  }

  
  return (
          <input key={paramId} onChange={(e) => modelHandler(e, setModel)} type="text" value={model}/>
  )
}

const ParamEditor:FC<Props> = ({params, model}) => {
  
  return (
    <>
        <div className='Params'>
          {params.map((paramProp)=>
          <Parameters key={paramProp.id} id={paramProp.id} name={paramProp.name} type={paramProp.type}/>
          )}
        </div>
        <div className='Values'>
          {model.paramValues.map((paramValue)=>
          <Model key={paramValue.paramId} paramId={paramValue.paramId} value={paramValue.value} />
          )}
        </div>
    </>
  )
}

const App: FC = () => {
  const [initialParamProps] = useState<ParamProps[]>([{id:1, name: 'Назначение', type:'string'}, {id: 2, name: 'Длина', type: 'string'}])
  const [initialModelProps] = useState<ModelProps>({paramValues: [
    {
      "paramId": 1,
      "value": "повседневное"
    },
    {
      "paramId": 2,
      "value": "макси"
  }]})

  return (
    <div className="App">
      <ParamEditor params={initialParamProps} model={initialModelProps}/>
    </div>
  );
}

export default App;


// interface ParamProps {
//   id: number;
//   name: string;
//   type: string;
// }

// interface ParamValue {
//   paramId: number;
//   value: string;
// }

// interface ModelProps {
//   paramValues: ParamValue[];
// }

// interface Props {
//   params: ParamProps[];
//   model: ModelProps;
// }

// interface State {
//   paramValues: ParamValue[];
// }

// class ParamEditor extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       paramValues: this.props.model.paramValues,
//     };
//   }

  
//   public getModel(): ModelProps {
//     return { paramValues: this.state.paramValues };
//   }

  
//   private updateParamValue = (paramId: number, newValue: string) => {
//     this.setState((prevState) => ({
//       paramValues: prevState.paramValues.map((paramValue) =>
//         paramValue.paramId === paramId ? { ...paramValue, value: newValue } : paramValue
//       ),
//     }));
//   };

//   render() {
//     const { params, model } = this.props;

//     return (
//       <div className="App">
//         <div className='Params'>
//           {params.map((paramProp) => (
//             <div key={paramProp.id}>{paramProp.name}</div>
//           ))}
//         </div>
//         <div className='Values'>
//           {model.paramValues.map((paramValue) => (
//             <Model
//               key={paramValue.paramId}
//               paramId={paramValue.paramId}
//               value={paramValue.value}
//               onChange={this.updateParamValue} 
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// const Model: FC<ParamValue & { onChange: (paramId: number, value: string) => void }> = ({ paramId, value, onChange }) => {
//   const [model, setModel] = React.useState<string>(value);

//   const modelHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.currentTarget.value;
//     setModel(newValue);
//     onChange(paramId, newValue); 
//   };

//   return (
//     <input key={paramId} onChange={modelHandler} type="text" value={model} />
//   );
// };

// const App: FC = () => {
//   const initialParamProps = [
//     { id: 1, name: 'Длина', type: 'string' },
//     { id: 2, name: 'Назначение', type: 'string' },
//   ];

//   const initialModelProps = {
//     paramValues: [
//       { paramId: 1, value: 'повседневное' },
//       { paramId: 2, value: 'макси' },
//     ],
//   };

//   return (
//     <ParamEditor params={initialParamProps} model={initialModelProps} />
//   );
// };

// export default App;