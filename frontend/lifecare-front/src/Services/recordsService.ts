/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';
import { logout } from './auth';
import { RecordType } from '../Types';

export async function getAllRecords(): Promise<any> {
  try {
    const response = await api.get("record/get-all");
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

export async function updateRecord(record: RecordType.Record): Promise<any> {
  try
  {
    const response = await api.put("record/update", record);
    const recordUpdated = response.data;

    return recordUpdated;
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

export async function saveRecord(
  name: string,
  cpf: string,
  phone: string,
  address?: string,
  description?: string,
): Promise<any> {
  try
  {
    const newRecord = {
      Name: name,
      CPF: cpf,
      Phone: phone,
      Address: address,
      Description: description,
    }

    const response = await api.put("record/update", newRecord);
    const recordSaved = response.data;

    return recordSaved;
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

export async function getRecordById(recordId: string): Promise<any> {
  try
  {
    const response = await api.get(`record/by-id/?id=${recordId}`);
    const data: RecordType.Record = response.data;

    return data;
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

export async function getRecordByCPF(cpf: string): Promise<any> {
  try
  {
    const response = await api.get(`record/by-cpf/?cpf=${cpf}`);
    const data: RecordType.Record = response.data;

    return data;
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

export async function removeRecord(recordId: number): Promise<any> {
  try
  {
    const response = await api.delete(`record/delete/?id=${recordId}`);
    const data = response.data;
    
    return data;
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

export async function saveFile(file: FormData, username: string) 
{
  try
  {
    const response =  await api.put(`file?username=${username}`, file);
    const data = response;
    
    return data;
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
