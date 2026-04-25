FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY MedicalClinic.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT}
ENV DOTNET_RUNNING_IN_CONTAINER=true

COPY --from=build /app/publish ./

# Render usually sets PORT. Default for local docker run.
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "MedicalClinic.dll"]
