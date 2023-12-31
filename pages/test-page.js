import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import testPageResource from '../resources/test-page'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Lead Program Planner</title>
          <meta
            property="og:title"
            content="test-page - Lead Program Planner"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_ri62f) => (
            <>
              <h1>{context_ri62f?.Name}</h1>
            </>
          )}
          initialData={props.contextRi62fProp}
          persistDataDuringLoading={true}
          key={props?.contextRi62fProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextRi62fProp = await testPageResource({
      ...context?.params,
    })
    return {
      props: {
        contextRi62fProp: contextRi62fProp?.data?.[0],
      },
    }
  } catch (errro) {
    return {
      notFound: true,
    }
  }
}
