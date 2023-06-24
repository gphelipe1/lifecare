import { RecordType } from "../Types";
import { DynamicObject, ServerResponse } from "../Types/Generic";
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

export async function createAdminUser(user: DynamicObject): Promise<any> {
  try {
    const response = await api.post('user/admin-signup', user);

    return response;
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

export async function getUserFile(): Promise<any> {
  try {
    const response = await api.get("user/get-file", {
      responseType: "arraybuffer",
    });

    const contentType = response.headers["content-type"];
    const arrayBuffer = response.data;

    const base64String = btoa(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );

    const imageUrl = `data:${contentType};base64,${base64String}`;

    return imageUrl;
  } catch (error) {
    console.error("Failed to get file", error);
  }
}

export async function deleteFile(): Promise<ServerResponse>
{
  try
  {
    const response: ServerResponse = await api.delete("user/remove-file");
    
    return response;
  }
  catch (error)
  {
    throw new Error("Error uploading the file ");
  }
}

export async function uploadFile(formData: any): Promise<ServerResponse>
{
  try
  {
    const responsePost: ServerResponse = await api.post("user/file", formData);
    
    return responsePost;
  }
  catch (error)
  {
    throw new Error("Error uploading the file ");
  }
}
