import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
  iconSetQuartzLight,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { useContext, useRef, useState } from "react";
import { Contact } from "../types/Contact";
import { ContactsContext } from "../context/ContactsContext";
import { deleteContact } from "../utils/apiMethods";

ModuleRegistry.registerModules([AllCommunityModule]);

const ContactsTable = () => {
  const gridRef = useRef<AgGridReact<Contact>>(null);
  const { data, refreshData } = useContext(ContactsContext);

  const [colDefs] = useState<ColDef[]>([
    { field: "name" },
    { field: "number" },
    { field: "emailAddress" },
    { 
      field: "created_At", 
      headerName: "Added at", 
      valueFormatter: (params) => {
        // Format the date using JavaScript
        const date = new Date(params.value);
        
        // Format the date to the desired format (12:00:00 /01/01/24)
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const formattedDate = date.toLocaleDateString('en-GB').split('/').reverse().join('/'); // "DD/MM/YY"
        
        return `${hours}:${minutes}:${seconds}  ---   ${formattedDate}`;
    } 
    },
    {
      field: "#",
      headerName: "Actions",
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <>
            <a className="govuk-link" href={`update/${params.data.id}`}>
              Edit
            </a>
            <a
              className="govuk-link"
              style={{ marginLeft: 10, color: "red" }}
              onClick={async () => {
                await deleteContact(params.data.id);
                refreshData();
                gridRef.current?.api.refreshCells({ force: true });
              }}
            >
              Delete
            </a>
          </>
        );
      },
    },
  ]);

  const myTheme = themeQuartz.withPart(iconSetQuartzLight).withParams({
    backgroundColor: "#ffffff",
    browserColorScheme: "light",
    columnBorder: false,
    foregroundColor: "rgb(0, 0, 0)",
    headerBackgroundColor: "#fff",
    headerTextColor: "rgb(0, 0, 0)",
    rowBorder: true,
    sidePanelBorder: true,
    spacing: 8,
    wrapperBorder: false,
    wrapperBorderRadius: 0,
  });

  const defaultColDef: ColDef = {
    flex: 3,
    resizable: false,
  };

  return (
    <div style={{ width: "100%", height: "60vh" }}>
      <AgGridReact
        theme={myTheme}
        rowData={data}
        columnDefs={colDefs}
        rowSelection={"single"}
        defaultColDef={defaultColDef}
        ref={gridRef}
      />
    </div>
  );
};

export default ContactsTable;
