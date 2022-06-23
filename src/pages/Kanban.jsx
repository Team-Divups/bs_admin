import React from 'react';
import { KanbanComponent, ColumnsDirective} from '@syncfusion/ej2-react-kanban';


import { Header } from '../components';

const Kanban = () => (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="App" title="Kanban" />
    <KanbanComponent
      id="kanban"
      keyField="Status"
      //dataSource=
      cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
    >
      <ColumnsDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {/*map((item, index)  <ColumnDirective key={index} {...item} />*/}
      </ColumnsDirective>
    </KanbanComponent>
  </div>
);

export default Kanban;
