import { get } from "lodash";
import { CachePolicies, IncomingOptions, Provider } from "use-http";

export default function HttpRequest({
  children,
}: {
  children: React.ReactElement;
}) {

  const options: IncomingOptions = {
    interceptors: {
      request: async ({
        options,
        url,
        path,
        route,
      }: {
        options: any;
        url?: string | undefined;
        path?: string | undefined;
        route?: string | undefined;
      }) => {
        const accessTokenData = JSON.parse(
          // @ts-ignore
          window.localStorage.getItem("ACCESS_TOKEN") || null
        );

        const accessToken = get(accessTokenData, "accessToken");

        if (accessToken) {
          options.headers.Authorization = `Bearer ${accessToken}`;
        }

        return options;
      },
    },
    cachePolicy: CachePolicies.NO_CACHE,
  };

  return (
    <Provider url={"http://localhost:45000"} options={options}>
      {children}
    </Provider>
  );
}
