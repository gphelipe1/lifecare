import { RecordType } from "../Types";
import api from "./api";
import { logout } from "./auth";

export async function getUserRecords(): Promise<any> {
    try {
      const response = await api.get("user/user-records");
      const allData: RecordType.Record[] = response.data;
  
      return allData;
    }
    catch (err: any)
    {
      if (err.response)
      {
        if (err.response.status === 401)
        {
          logout();
        }
      }
      return {
        has_error: true,
        err
      };
    }
  }

  export async function getUserRecordDetail(recordId: number): Promise<any> {
    try {
      const response = await api.get(`user/user-records/detail?recordId=${recordId}`);
      const allData: RecordType.Record[] = response.data;
  
      return allData;
    }
    catch (err: any)
    {
      if (err.response)
      {
        if (err.response.status === 401)
        {
          logout();
        }
      }
      return {
        has_error: true,
        err
      };
    }
  }