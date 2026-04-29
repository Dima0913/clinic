FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Server/MedicalClinic.csproj ./Server/
RUN dotnet restore Server/MedicalClinic.csproj

COPY . ./
RUN dotnet publish Server/MedicalClinic.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT}
ENV PORT=8080

COPY --from=build /app/publish ./

EXPOSE 8080

ENTRYPOINT ["dotnet", "MedicalClinic.dll"]