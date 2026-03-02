import { createContext, useContext, ReactNode} from "react";

type StatusType ={
    pending: {
        label:string,
        className:string
    },
    accepted: {
         label:string,
        className:string
    },
    refused: {
         label:string,
        className:string
    },
    completed: {
         label:string,
        className:string
    },
    cancelled_by_owner: {
         label:string,
        className:string
    },
    cancelled_by_renter: {
         label:string,
        className:string
    },
    confirmed: {
         label:string,
        className:string
    },
}

const StatusContext=createContext<{status:StatusType} | undefined>(undefined)

export default function StatusProvider({ children }: {children: ReactNode} ){
    const status: StatusType={
    pending: {
      label: "En attente",
      className: "bg-yellow-100 text-yellow-800 border-yellow-300"
    },
    accepted: {
      label: "Accepté",
      className: "bg-blue-100 text-blue-800 border-blue-300"
    },
    refused: {
      label: "Refusé",
      className: "bg-red-100 text-red-800 border-red-300"
    },
    completed: {
      label: "Terminé",
      className: "bg-gray-100 text-gray-800 border-gray-300"
    },
    cancelled_by_owner: {
      label: "Annulé",
      className: "bg-red-100 text-red-800 border-red-300"
    },
    cancelled_by_renter: {
      label: "Annulé",
      className: "bg-red-100 text-red-800 border-red-300"
    },
    confirmed: {
      label: "Confirmé",
      className: "bg-green-100 text-green-800 border-green-300"
    }
    }

     return (
    <StatusContext.Provider value={{ status }}>
      {children}
    </StatusContext.Provider>
  );

}
export const useStatus = () => {
    const context = useContext(StatusContext);
      if (!context) {
        throw new Error();
      }
      return context
    }
